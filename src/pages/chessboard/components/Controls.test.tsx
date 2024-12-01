import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Controls from './Controls';

describe('Controls Component', () => {
  test('renders correctly with props', () => {
    render(
      <Controls
        startPosition="a1"
        endPosition="b2"
        shortestPath="a1-b2-c3"
        loading={false}
        error={null}
        onFetchKnightPath={() => {}}
      />,
    );

    expect(screen.getByText('Start Position: a1')).toBeInTheDocument();
    expect(screen.getByText('End Position: b2')).toBeInTheDocument();
    expect(screen.getByText('Shortest Path: a1-b2-c3')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /fetch knight path/i }),
    ).toBeEnabled();
  });

  test('disables button when loading or no positions are set', () => {
    const { rerender } = render(
      <Controls
        startPosition={null}
        endPosition={null}
        shortestPath={null}
        loading={false}
        error={null}
        onFetchKnightPath={() => {}}
      />,
    );

    const button = screen.getByRole('button', { name: /fetch knight path/i });
    expect(button).toBeDisabled();

    rerender(
      <Controls
        startPosition="a1"
        endPosition="b2"
        shortestPath={null}
        loading={true}
        error={null}
        onFetchKnightPath={() => {}}
      />,
    );

    expect(button).toBeDisabled();
  });

  test('calls onFetchKnightPath when button is clicked', () => {
    const mockFetchKnightPath = jest.fn();

    render(
      <Controls
        startPosition="a1"
        endPosition="b2"
        shortestPath={null}
        loading={false}
        error={null}
        onFetchKnightPath={mockFetchKnightPath}
      />,
    );

    const button = screen.getByRole('button', { name: /fetch knight path/i });
    fireEvent.click(button);

    expect(mockFetchKnightPath).toHaveBeenCalledTimes(1);
  });

  test('shows an error message when error prop is provided', () => {
    render(
      <Controls
        startPosition="a1"
        endPosition="b2"
        shortestPath={null}
        loading={false}
        error="Failed to fetch knight path"
        onFetchKnightPath={() => {}}
      />,
    );

    expect(screen.getByText('Failed to fetch knight path')).toBeInTheDocument();
  });
});
