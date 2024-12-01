export default class ChessService {
  private static instance: ChessService;

  private constructor() {}

  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new ChessService();
    }

    return this.instance;
  }

  async getKnightPaths(
    startPosition: string,
    endPosition: string,
    stepsLimit: number,
  ): Promise<Response> {
    const payload = {
      startPosition,
      endPosition,
      chessPieceType: 'knight',
      stepsLimit,
    };
    console.log('ss');

    const result = fetch('http://localhost:3100/api/chess/paths', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return result;
  }
}
