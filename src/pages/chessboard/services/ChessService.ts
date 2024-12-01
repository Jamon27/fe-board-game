// export default class ChessService {
//   private static instance: ChessService;

//   private constructor() {}

//   static getInstance() {
//     if (this.instance === null) {
//       this.instance = new ChessService();
//     }

//     return this.instance;
//   }

//   async getPath(
//     startPosition: string,
//     endPosition: string,
//     pieceType: string,
//     stepsLimit: number,
//   ): Promise<string[]> {
//     //fetch('http://localhost:3000/api/chess', { method: 'POST' });
//     return [''];
//   }
// }

abstract class ChessPiece {
  public color: string;
  public position: string;

  // Static property for move offsets, must be overridden in derived classes
  protected static moveOffsets: number[][];

  constructor(color: string, position: string) {
    this.color = color;
    this.position = position;
  }

  // Static getter for moveOffsets
  protected abstract getMoveOffsets(): number[][];

  // Calculate possible moves using moveOffsets
  public getPossibleMoves(): string[] {
    const moveOffsets = this.getMoveOffsets();
    const [file, rank] = this.position.split('');
    const x = file.charCodeAt(0) - 'a'.charCodeAt(0); // Convert 'a-h' to 0-7
    const y = parseInt(rank, 10) - 1; // Convert '1-8' to 0-7

    return moveOffsets
      .map(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;

        // Ensure the move is within the board boundaries
        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
          return String.fromCharCode('a'.charCodeAt(0) + newX) + (newY + 1);
        }
        return null;
      })
      .filter(Boolean) as string[];
  }
}

class Knight extends ChessPiece {
  // Static property for moveOffsets specific to Knight
  protected getMoveOffsets(): number[][] {
    return [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];
  }

  constructor(color: string, position: string) {
    super(color, position);
  }

  // Override the static getter to provide Knight-specific offsets
  protected static getMoveOffsets(): number[][] {
    return this.moveOffsets;
  }
}
