import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders react-circle-wave', () => {
  render(<App />);
  const linkElement = screen.getByText(/react-circle-wave/i);
  expect(linkElement).toBeInTheDocument();
});
