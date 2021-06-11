import Nav from './nav.js';
import TodoForm from './form.js';
import TodoList from './list.js';

import './todo.scss';

import { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import useAxios from 'axios-hooks';


function ToDo() {

  const [list, setList] = useState([])
  const [{ data, loading, error }, refetch] = useAxios({
    url: 'https://api-js401.herokuapp.com/api/v1/todo', method: "GET"
  });

  const addItem = (item) => {
    item.complete = false;
    let url = 'https://api-js401.herokuapp.com/api/v1/todo';
    axios.post(url, item)
      .then(function (response) {
        console.log(response);
        refetch()
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const toggleComplete = async (id) => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let updateItem = list.map(listItem => listItem._id === item._id ? item : listItem);
      let url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`
      setList(updateItem)
      await axios.put(url, item)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleDeleteItem = (id) => {
    let url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`
    axios.delete(url)
      .then(function (response) {
        console.log(response);
        refetch()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (data && data.results) {
      console.log('Data: ', data.results)
      setList(data.results)
    }
  }, [data]);

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
                handleDeleteItem={handleDeleteItem}
              /></Col>
            </Row>
          </Container>
        </section>
      </Container>
    </>
  )
}

export default ToDo;