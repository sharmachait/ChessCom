import { WebSocket } from 'ws';
import { Chess } from 'chess.js';
import { GAME_OVER, MOVE, INIT_GAME } from './Messages';
class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private startTime: Date;
  private moveCount: number;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.moveCount = 0;

    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: 'white',
        },
      })
    );

    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: 'black',
        },
      })
    );
  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    //0 pe player2 not allowed
    // if (this.moveCount === 0 && socket !== this.player1) return;
    //odd pe player1 not allowed
    //even pe player2 not allowed

    if (this.moveCount % 2 === 0 && socket === this.player2) {
      console.log('player 2 can not make a move at this point');
      console.log(this.moveCount);
      return;
    }
    if (this.moveCount % 2 === 1 && socket === this.player1) {
      console.log('player 1 can not make a move at this point');
      console.log(this.moveCount);
      return;
    }

    if (socket === this.player1) {
      console.log('move by player 1');
    } else {
      console.log('move by player 2');
    }

    try {
      this.board.move(move);
      this.moveCount++;
    } catch (e) {
      console.error(e);
      return;
    }
    console.log('move successful');

    if (this.board.isGameOver()) {
      let winner: string = this.board.turn() === 'w' ? 'black' : 'white';
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: winner,
          },
        })
      );
      this.player2.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: winner,
          },
        })
      );
      return;
    }

    if (socket === this.player1) {
      console.log('sending to user 2');
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      console.log('sending to user 1');
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
  }
}
export default Game;
