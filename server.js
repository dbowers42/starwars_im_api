const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
require('express-ws')(app);

let sockets = []

function broadcast(message) {
  console.log('broadcasting ...')
  sockets.forEach( (socket) => {
    console.log('sending ...')
    socket.send(message)
  })
}

import UserManager from './user_manager'
let manager = new UserManager()

app.use(cors())
app.use( bodyParser.json() );

app.use((req, res, next) => {
    req.testing = 'testing';
    return next();
});

app.post('/signin', (req, res) => {
    console.log(`${req.body.screenName} is logging in`)
    manager.login(req.body.screenName)
    broadcast(JSON.stringify({action: 'login'}))
    res.json({})
})

app.get('/users', (req, res) => {
  res.json(manager.getAvailableUsers())
})

app.get('/', (req, res, next) => {
    console.log('get route', req.testing);
    res.end();
});

app.ws('/chat', (ws, req) => {
  sockets.push(ws)

  console.log(sockets.length)
  ws.on('message', (msg) => {
    let data = JSON.parse(msg)

    switch(data.action){
      case('getUsers'):
        let payload = {action: 'users', payload: manager.getAllUsers()}
        ws.send(JSON.stringify(payload))
      case('sendMessage'):
      break
      break;
      default:
        ws.send(`echo: ${msg}`)
    }

  })
})

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        ws.send(`echo ${msg}`)
    });
    console.log('socket', req.testing);
});

app.listen(8080, () => console.log('server running on port 8080'))
