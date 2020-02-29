import Reactotron from 'reactotron-react-js'

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure({
    port: 3000,
    host: '192.168.0.124',
  }).connect()

  tron.clear()

  console.tron = tron
}
