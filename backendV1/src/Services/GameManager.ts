import Game from './Game';
import { WebSocket } from 'ws';
import { GAME_OVER, INIT_GAME, MOVE, QUIT } from './Messages';

//need a user class and a game class
class GameManager {
  private games: (Game | null)[];
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
      try {
        const message = JSON.parse(data.toString());

        if (message.type === INIT_GAME) {
          if (this.pendingUser) {
            const game = new Game(this.pendingUser, socket);
            this.games.push(game);
            this.pendingUser = null;
          } else {
            this.pendingUser = socket;
          }
        }

        if (message.type == MOVE) {
          let game: Game | null | undefined = this.games.find(
            (game) => game?.player1 === socket || game?.player2 === socket
          );
          if (game) {
            const res = game.makeMove(socket, message.move);
            if (res === GAME_OVER) {
              this.games = this.games.filter((g) => {
                return game !== g;
              });
              game = null;
            }
          }
        }

        if (message.type == QUIT) {
          let game: Game | null | undefined = this.games.find(
            (game) => game?.player1 === socket || game?.player2 === socket
          );
          if (game) {
            game.quit(socket);
            this.games = this.games.filter((g) => {
              return game !== g;
            });
            game = null;
          }
        }
      } catch (e) {
        console.log(e);
        return;
      }
    });
  }
}
export default GameManager;
