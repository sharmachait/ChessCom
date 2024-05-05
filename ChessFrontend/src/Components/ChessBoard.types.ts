import { Color, PieceSymbol, Square } from 'chess.js';

export type chessProps = {
  board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][];
  socket: WebSocket;
  setBoard: React.Dispatch<
    React.SetStateAction<
      ({ square: Square; type: PieceSymbol; color: Color } | null)[][]
    >
  >;
};
