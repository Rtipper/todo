import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

let mockTest = new MockAdapter(axios)

const mockPostsData = [
  { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
  { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
  { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
  { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
  { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' }
];

describe("Todo Tests", () => {

  mockTest.onGet("https://api-js401.herokuapp.com/api/v1/todo").reply(200, {
    results: mockPostsData
  })

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
});
