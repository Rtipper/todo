import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';

test('Renders the title at the top of of the page', () => {
  render(<App />)
  const title = screen.getByText('HOME');
  expect(title).toBeInTheDocument();
});

test('Able to click an item from the list of tasks', () => {
  render(<App />)
  const listItem = screen.getAllByLabelText('listItem')[0]
  fireEvent.click(listItem)

  const remainingTasks = screen.getByText('There are 2 Items To Complete')
  expect(remainingTasks).toBeInTheDocument();
});