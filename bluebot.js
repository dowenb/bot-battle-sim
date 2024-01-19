const express = require('express')
const superagent = require('superagent');
const app = express()
app.use(express.json());
const port = 3002

let bot = {
    botNumber: null,
    botPort: port
}

async function startBot() {
    await superagent
        .post('http://localhost:3000/register/blue')
        .send({ port })
        .then((res) => {
            bot.botNumber = res.body.botNumber
        })
        .catch(console.error);
}

async function killBot() {
    await superagent
        .delete('http://localhost:3000/bots/blue')
        .send(bot)
        .then(console.log('Oh no, not again'))
        .catch(console.error)
    process.exit(1)
}

async function acquireTarget() {
    await superagent
        .get('http://localhost:3000/bots/red')
        .then((res) => {
            let redBots = res.body
            if (redBots.length > 0) {
                let target = redBots[Math.floor(Math.random() * redBots.length)]
                console.log(`Target acquired:\n${JSON.stringify(target)}`)
                attackTarget(target.botPort)
            } else {
                console.log("Failed to acquire target")
            }
        })
        .catch(console.error)
}

async function attackTarget(port) {
    let attackRoll = 1 + Math.floor(Math.random() * 20) // 1d20

    await superagent
        .post(`http://localhost:${port}/attack`)
        .send({ botNumber: bot.botNumber, attackRoll: attackRoll })
        .then(res => {
            console.log('== Outcome ==\n')
            console.log(JSON.stringify(res.body))
        })
        .catch(console.error);
}


startBot()
    .then(() => {
        console.log(JSON.stringify(bot))
    })
    .then(() => {
        setInterval(acquireTarget, 1000 + Math.floor(Math.random() * 4000))
    })

app.get('/', (req, res) => {
    res.send(JSON.stringify(bot))
    console.log(`${JSON.stringify(bot)}`)
}
)

app.post('/attack', (req, res) => {
    attackRoll = req.body.attackRoll // Incoming roll from tht dirty Red Bot!
    attackBotNumber = req.body.botNumber // botNumber of the attacking Red Bot! At least, I assume they are red...
    console.log(`Bot ${attackBotNumber} attacks with a roll of ${attackRoll}`)

    defensiveRoll = 1 + Math.floor(Math.random() * 20) // My Blue Bot roll
    console.log(`My defensive roll: ${defensiveRoll}`)

    if (defensiveRoll === attackRoll) {
        console.log('Draw')
        res.send({ winner: draw })
    } else if (defensiveRoll > attackRoll) {
        console.log('I win')
        res.send({ winner: "me" })
    } else {
        console.log('They won! noooo!')
        res.send({ winner: "you" })
        killBot()
    }
})

app.listen(port, () => {
    console.log('Blue Bot Go!')
})