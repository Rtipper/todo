import { useState, useEffect, useContext } from 'react';
import { If, Then} from 'react-if';
import { Navbar, Container, Row, Col } from 'react-bootstrap';

import Nav from '../nav.js';
import TodoForm from '../form.js';
import TodoList from '../list.js';
import Pagination from '../pagination.js';
import DropDown from '../drop_down.js';

import { SortContext } from '../../context/siteContext.js';
import { LoginContext } from '../../auth/context';

import axios from 'axios';
import useAxios from 'axios-hooks'

import './todo.scss';

function ToDo() {
  const [list, setList] = useState([])
  const [{ data, error }, refetch] = useAxios({
    url: 'https://api-js401.herokuapp.com/api/v1/todo', method: "GET"
  });
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(3)

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentList = list.slice(indexOfFirstPost, indexOfLastPost);


  let { sort } = useContext(SortContext);
  const userContext = useContext(LoginContext)

  useEffect(() => {
    switch (sort) {
      case 'all':
        setList(data.results)
        break;
      case 'completed':
        let completedList = data.results.filter(value => value.complete)
        setList(completedList)
        break;
      case 'incomplete':
        let incompleteList = data.results.filter(value => value.complete === false)
        setList(incompleteList)
        break;
      case 'ascending':
        let ascending = data.results.sort(function (a, b) {
          return b.difficulty - a.difficulty;
        });
        setList(ascending)
        break;
      case 'descending':
        let descending = data.results.sort(function (a, b) {
          return a.difficulty - b.difficulty;
        })
        setList(descending)
        break;
      default:
    }
  }, [sort])

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
      let updateItems = list.map(listItem => listItem._id === item._id ? item : listItem);
      let url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`
      setList(updateItems)
      await axios.put(url, item)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleDelete = (id) => {
    let url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`
    axios.delete(url)
      .then(function (response) {
        refetch()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    if (data && data.results) {
      let incompleteList = data.results.filter(value => value.complete === false)
      let completedList = data.results.filter(value => value.complete)
      let sortByCompletion = incompleteList.concat(completedList)
      setList(sortByCompletion)
    }
  }, [data]);

  return (
    <>
      <header>
        <Nav />
      </header>
      <If condition={userContext.isLoggedIn}>
        <Then>
          <Container>
            <Navbar bg="dark" expand="sm" variant="dark">
              <Navbar.Brand href="#home">There are {list.filter(item => !item.complete).length} Items To Complete</Navbar.Brand>
            </Navbar>
            <section className="todo">
              <Container>
                <Row>
                  <Col sm={4}><TodoForm addItem={addItem} /></Col>
                  <Col xs={8}><TodoList
                    list={currentList}
                    handleComplete={toggleComplete}
                    handleDelete={handleDelete}
                  />
                    <div className="control-items">
                      <Pagination
                        PostsPerPage={postsPerPage}
                        totalPosts={list.length}
                        paginate={paginate}
                        currentPage={currentPage}
                      />
                      <DropDown />
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Container>
        </Then>
      </If>
    </>
  )
}

export default ToDo;