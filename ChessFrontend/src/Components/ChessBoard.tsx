import { chessProps } from './ChessBoard.types.ts';
import { useState } from 'react';
import { Square } from 'chess.js';
import { MOVE } from '../Pages/Game.tsx';

function ChessBoard(props: chessProps) {
  const board = props.board;
  const [from, setFrom] = useState<Square | null>(null);
  // const [to, setTo] = useState<Square | null>(null);
  function handleClick(square: Square) {
    if (from === null) {
      setFrom(square ? square : null);
    } else {
      console.log(square);
      props.socket.send(
        JSON.stringify({
          type: MOVE,
          move: { from: from, to: square },
        })
      );
      // setTo(square?.square ? square.square : null);
      setFrom(null);
      chess.move({ from: from, to: square });
      props.setBoard(chess.board());
    }
  }
  return (
    <div className="text-white">
      {board.map((row, i) => {
        return (
          <div className="flex" key={i}>
            {row.map((square, j) => {
              const sq = (String.fromCharCode(97 + (j % 8)) +
                '' +
                (8 - i)) as Square;
              return (
                <div
                  onClick={() => {
                    handleClick(sq);
                  }}
                  className={`w-24 h-24 ${(i + j) % 2 ? 'bg-green-700' : 'bg-yellow-100'} flex justify-center items-center`}
                  key={j}
                >
                  {square ? square.type : ''}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ChessBoard;
