const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

var blueBots = []
var redBots = []

function newBot(port) {
  return {
    botNumber: Math.floor(Math.random() * 9999),
    botPort: botPort = port
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

app.delete('/bots/red', (req, res) => {
  var botToDelete = req.body.botNumber
  console.log(`Deleting Red Bot: ${botToDelete}`)
  
  redBots = redBots.filter((item) => item.botNumber !== botToDelete)

  res.sendStatus(204)
  console.log(`Updated Red Bot list:\n${JSON.stringify(redBots)}`)
}
)

app.delete('/bots/blue', (req, res) => {
  var botToDelete = req.body.botNumber
  console.log(`Deleting blue Bot: ${botToDelete}`)
  
  blueBots = blueBots.filter((item) => item.botNumber !== botToDelete)

  res.sendStatus(204)
  console.log(`Updated Blue Bot list:\n${JSON.stringify(blueBots)}`)
}
)

app.listen(port, () => {

  console.log(`Example app listening on port ${port}`)
})