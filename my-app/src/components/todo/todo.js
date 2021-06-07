import Nav from './nav.js';
import TodoForm from './form.js';
import TodoList from './list.js';

import './todo.scss';

import { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';


function ToDo() {

  const [list, setList] = useState([])
  const [id, setId] = useState(0)

  const addItem = (item) => {
    item._id = id;
    setId(id + 1)
    item.complete = false;
    setList([...list, item])
  };

  const toggleComplete = (id) => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let updateItem = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(updateItem)
    }
  };

  useEffect(() => {
    let dummyData = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    ];
    setList(dummyData)
  }, []);

  return (
    <>
      <header>
        <Nav />
      </header>
      <Container>
        <Navbar bg="dark" expand="sm" variant="dark">
          <Navbar.Brand href="#home">There are {list.filter(item => !item.complete).length} Items Left To Complete</Navbar.Brand>
        </Navbar>
        <section className="todo">
          <Container>
            <Row>
              <Col sm={4}><TodoForm handleSubmit={addItem} /></Col>
              <Col xs={8}><TodoList
                list={list}
                handleComplete={toggleComplete}
              /></Col>
            </Row>
          </Container>
        </section>
      </Container>
    </>
  )
}

export default ToDo;