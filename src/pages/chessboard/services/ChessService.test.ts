import ChessService from './chessService';

describe('ChessService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  test('should return the same instance (singleton behavior)', () => {
    const instance1 = ChessService.getInstance();
    const instance2 = ChessService.getInstance();
    expect(instance1).toBe(instance2); // Both should be the same instance
  });

  test('should make a successful API call to getKnightPaths', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        shortestPaths: ['a1', 'b2', 'c3'],
      }),
    };
    // eslint-disable-next-line no-undef
    global.fetch = jest
      .fn()
      .mockResolvedValue(mockResponse as unknown as Response);

    const service = ChessService.getInstance();
    const result = await service.getKnightPaths('a1', 'c3', 3);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3100/api/chess/paths',
      {
        method: 'POST',
        body: JSON.stringify({
          startPosition: 'a1',
          endPosition: 'c3',
          chessPieceType: 'knight',
          stepsLimit: 3,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await result.json();
    expect(data).toEqual({ shortestPaths: ['a1', 'b2', 'c3'] });
  });

  test('should handle API failure gracefully', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    };
    // eslint-disable-next-line no-undef
    global.fetch = jest.fn().mockResolvedValue(mockResponse as Response);

    const service = ChessService.getInstance();
    const result = await service.getKnightPaths('a1', 'c3', 3);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3100/api/chess/paths',
      {
        method: 'POST',
        body: JSON.stringify({
          startPosition: 'a1',
          endPosition: 'c3',
          chessPieceType: 'knight',
          stepsLimit: 3,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    expect(result.ok).toBe(false);
    expect(result.status).toBe(500);
    expect(result.statusText).toBe('Internal Server Error');
  });
});
