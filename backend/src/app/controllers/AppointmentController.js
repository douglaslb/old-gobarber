import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import Appointment from '../models/Appointment'
import User from '../models/User'
import File from '../models/File'
import Notification from '../schemas/Notification'
import CancellationMail from '../jobs/CancellationMail'
import Queue from '../../lib/Queue'

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceledAt: null },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    })

    return res.json(appointments)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { provider_id, date } = req.body

    /*
     *Check if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    })

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointment with providers' })
    }

    if (req.userId === provider_id) {
      return res
        .status(401)
        .json({ error: 'You cannot create appointments with yourself' })
    }

    /*
     * Checking past dates
     */

    const hourStart = startOfHour(parseISO(date))

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not allowed' })
    }

    /*
     * Checking date availability
     */

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceledAt: null,
        date: hourStart,
      },
    })

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' })
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    })

    /**
     * Notify appointment provider
     */

    const user = await User.findByPk(req.userId)
    const formattedDate = format(hourStart, "'dia' dd 'de' MMMM', às' H'h'mm", {
      locale: pt,
    })

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    })

    return res.json(appointment)
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    })

    if (appointment.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to cancel this appointment" })
    }

    const dateLimit = subHours(appointment.date, 2)

    if (isBefore(dateLimit, new Date())) {
      return res
        .status(401)
        .json({ error: 'You can only cancel appointments 2 hours in advance' })
    }

    appointment.canceledAt = new Date()

    await appointment.save()

    await Queue.add(CancellationMail.key, {
      appointment,
    })

    return res.json(appointment)
  }
}

export default new AppointmentController()
