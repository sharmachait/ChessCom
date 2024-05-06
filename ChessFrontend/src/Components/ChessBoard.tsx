import { chessProps } from './ChessBoard.types.ts';
import { useState } from 'react';
import { Color, PieceSymbol, Square } from 'chess.js';
import { MOVE } from '../Pages/Game.tsx';

function ChessBoard(props: chessProps) {
  const board = props.board;
  const [from, setFrom] = useState<Square | null>(null);

  function handleClick(square: Square) {
    if (from === null) {
      setFrom(square ? square : null);
    } else {
      console.log({ from: from, to: square });

      props.chess.move({ from: from, to: square });
      props.setBoard(props.chess.board());

      props.socket.send(
        JSON.stringify({
          type: MOVE,
          move: { from: from, to: square },
        })
      );

      setFrom(null);
    }
  }
  function getPiece(type: PieceSymbol, color: Color): string {
    let piece: string = color + type + '.png';
    return piece;
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
                  {square ? (
                    <img
                      src={`/${getPiece(square.type, square.color)}`}
                      className={'w-16'}
                    />
                  ) : (
                    ''
                  )}
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
