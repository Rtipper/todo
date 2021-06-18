
import { Card } from 'react-bootstrap';
import useForm from './hooks/useForm.js'
import Auth from '../auth/auth.js'


function TodoForm(props) {

  const [handleSubmit, handleChange] = useForm(props.addItem)

  return (
    <>
      <Auth capability="create">
        <form data-testid="formTest" onSubmit={handleSubmit}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Add Item To Do Item</Card.Title>
              
              <Card.Text>To Do Item</Card.Text>
              <input
                data-testid="addItemTest"
                type="text"
                name="text"
                placeholder="Add To Do List Item"
                onChange={handleChange}
              />
              
              <Card.Text>Assigned To</Card.Text>
              <input
                data-testid="assigneeTest"
                type="text"
                name="assignee"
                placeholder="Assigned To"
                onChange={handleChange} />
              
              <Card.Text>Difficulty Rating</Card.Text>
              <input
                data-testid="difficultyTest"
                defaultValue="1"
                type="range"
                min="1"
                max="5"
                name="difficulty"
                onChange={handleChange} />

              <button id="submitbutton">Add Item</button>
              
            </Card.Body>
          </Card>
        </form>
      </Auth>
    </>
  )
}

export default TodoForm;