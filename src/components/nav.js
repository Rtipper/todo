import { Navbar } from 'react-bootstrap';
import Login from '../auth/login.js'

function Nav() {
  return (
    <Navbar className="top-nav" bg="primary" expand="lg" variant="dark">
      <Navbar.Brand href="#home">HOME</Navbar.Brand>
      <Navbar.Brand href="#about">ABOUT</Navbar.Brand>
      <Navbar.Brand href="#contact">CONTACT</Navbar.Brand>
      <Navbar.Brand href="#help">HELP</Navbar.Brand>
      <Login />
    </Navbar>
  )
}

export default Nav;

