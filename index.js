const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

const blueBots = []
const redBots = []

function newBot(port) {
  return {
    botNumber: Math.floor(Math.random() * 9999),
    botPort:   botPort = port
  }
}
app.post('/register/blue', (req, res) => {
  const blueBot = newBot(req.body.port)
  blueBots.push(blueBot)
  res.send(blueBot)
  console.log(`Blue Bot ${blueBot.botNumber} registered, with port ${blueBot.port}`)
})

app.post('/register/red', (req, res) => {
  const redBot = newBot(req.body.port)
  redBots.push(redBot)
  res.send(redBot)
  console.log(`Red Bot ${redBot.botNumber} registered, with port ${redBot.botNumber}`)
})

app.get('/bots/blue', (req, res) => {
  res.send(blueBots)
  console.log(`List of Blue Bots: \n${JSON.stringify(blueBots)}`)
}
)

app.get('/bots/red', (req, res) => {
  res.send(redBots)
  console.log(`List of Red Bots: \n${JSON.stringify(redBots)}`)
}
)

app.listen(port, () => {

  console.log(`Example app listening on port ${port}`)
})