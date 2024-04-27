import Game from './Game';
import { WebSocket } from 'ws';
import { INIT_GAME } from './Messages';

//need a user class and a game class
class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor(games: Game[]) {
    this.users = [];
    this.pendingUser = null;
    this.games = games;
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((x) => x !== socket);
  }

  private addHandler(socket: WebSocket) {
    socket.on('message', (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          //start game
        } else {
          this.pendingUser = socket;
        }
      }
    });
  }
}
export default GameManager;
