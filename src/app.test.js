import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';

test('Renders the title at the top of of the page', () => {
  render(<App />)
  const title = screen.getByText('HOME');
  expect(title).toBeInTheDocument();
});

test('Renders initial list items', () => {
  render(<App />)
  const listItems = screen.getAllByLabelText('listItem')
  expect(listItems.length).toBe(5)
});
