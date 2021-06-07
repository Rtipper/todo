import { ListGroup } from 'react-bootstrap';

function TodoList(props) {
  return (
    <ListGroup>
      {
        props.list.map(item => (
          <ListGroup.Item
            aria-label="listItem"
            onClick={() => props.handleComplete(item._id)}
            variant={item.complete ? "success" : "light"}
            key={item._id}>
            {item.text}
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
}

export default TodoList