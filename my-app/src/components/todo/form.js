import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

function TodoForm(props) {
  const [item, setItem] = useState({})

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    setItem({});
  }

  return (
    <>
       <form data-testid="testForm" onSubmit={handleSubmit}>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Add An Item to the To Do List </Card.Title>
            <input
              id="toDoItem"
              type="text"
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
            />
            <Card.Text>Difficulty Rating</Card.Text>
            <input
              id="diffRating"
              defaultValue="1"
              type="range"
              min="1"
              max="5"
              name="difficulty"
              onChange={handleInputChange} />

            <Card.Text>Assigned To</Card.Text>
            <input
              type="text"
              name="assignee"
              placeholder="Type Name Here"
              onChange={handleInputChange} />

            <Button id="submitbutton" variant="primary" type="submit">
              Add New Task
            </Button>

          </Card.Body>
        </Card>
      </form>
    </>
  )
}

export default TodoForm;