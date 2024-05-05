import { WebSocketServer } from 'ws';
import GameManager from './Services/GameManager';
require('dotenv').config();
const wss = new WebSocketServer({
  port: 8080,
});

const gameManager = new GameManager([]);

wss.on('connection', function connection(ws) {
  gameManager.addUser(ws);
  // add pinger to ws
  ws.on('close', () => {
    console.log('closing');
    gameManager.removeUser(ws);
  }); //TODO: timeout handling
});
