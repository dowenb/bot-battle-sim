# bot-battle-sim
A simulation of a battle between blue and red bots

TODO:

- Scale using a range of port numbers so more than one of each bot can run at once
- Get things running in Docker
- Run a demo session to show what it does, probably record it
- Write some challenges for testing it, there are loads of imperfections / bugs to be found I'm sure
- Make some kind of UI to visualize what is going on
- Add some kind of observability, to view running containers and logs

```
# Start server first

nvm use
npm ci
node index.js

# Start bots

node bluebot.js

node redbot.js
```
