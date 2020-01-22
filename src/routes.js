import { Router } from 'express'
import User from './app/models/User'

const routes = new Router()

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Douglas Lima',
    email: 'doug.lb07@gmail.com',
    password_hash: '1231332',
  })
  return res.json(user)
})

export default routes
