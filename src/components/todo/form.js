import { Card, Button } from 'react-bootstrap';
import useForm from './hooks/useForm.js'

function TodoForm(props) {
  
  const [handleSubmit, handleInputChange, formData] = useForm(props.addItem)

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
              onChange={handleInputChange} 
            />
            <Card.Text>Assigned To</Card.Text>
            <input
              type="text"
              name="assignee"
              placeholder="Type Name Here"
              onChange={handleInputChange} 
            />


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