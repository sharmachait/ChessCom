import ChessBoard from '../Components/ChessBoard.tsx';
import Button from '../Components/Button.tsx';
import useSocket from '../hooks/useSocket.ts';
import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';

export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'game_over';

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  useEffect(() => {
    if (socket === null) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          setChess(new Chess());
          setBoard(chess.board());
          console.log('game initialized');
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log('move');
          break;
        case GAME_OVER:
          console.log('game over');
          break;
      }
    };
  }, [socket]);

  // if (socket === null) {
  //   return <div className="text-white">Connecting....</div>;
  // }
  function startGame() {
    socket?.send(JSON.stringify({ type: INIT_GAME }));
  }
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-xl w-full">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          <div className="col-span-4 w-full">
            <ChessBoard
              setBoard={setBoard}
              socket={socket}
              board={board}
            ></ChessBoard>
          </div>
          <div className="col-span-2 w-full flex justify-center items-center bg-gray-800">
            <Button onClick={startGame}>Play</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Game;
