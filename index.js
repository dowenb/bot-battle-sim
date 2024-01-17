const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

const blueBots = {}
const redBots = {}

app.post('/register/blue', (req, res) => {
    let randomBlueBotNumber = Math.floor(Math.random() * 9999)
    let botPort = req.body.port
    blueBots.randomBlueBotNumber = botPort
    res.send(randomBlueBotNumber.toString())
    console.log(`Blue Bot ${randomBlueBotNumber} registered, with port ${botPort}`)
  })

  app.post('/register/red', (req, res) => {
    let randomRedBotNumber = Math.floor(Math.random() * 9999)
    let botPort = req.body.port
    redBots.randomRedBotNumber = botPort
    res.send(randomRedBotNumber.toString())
    console.log(`Red Bot ${randomRedBotNumber} registered, with port ${botPort}`)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})