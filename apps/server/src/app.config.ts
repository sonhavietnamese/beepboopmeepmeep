import config from '@colyseus/tools'
import { monitor } from '@colyseus/monitor'
import { playground } from '@colyseus/playground'
import { Planet } from '@/rooms/planet'

export default config({
  initializeGameServer: (gameServer) => {
    gameServer.define('planet', Planet)
  },

  initializeExpress: (app) => {
    app.get('/hello_world', (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!")
    })

    if (process.env.NODE_ENV !== 'production') {
      app.use('/', playground)
    }

    app.use('/colyseus', monitor())
  },

  beforeListen: () => {},
})
