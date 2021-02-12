import logo from './logo.svg';
import './App.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import Article from './pages/Article';
import Home from './pages/Home';
import User from './components/users';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/article">
              <Nav.Link>Article test</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
              <Nav.Link>Administration</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container-fluid p-0">
        <Switch>
          <Route exact path="/">
            <Home  />
          </Route>
          <Route path="/article">
            <Article />
          </Route>
          <Route path="/users">
            <User></User>
          </Route>
        </Switch>
      </div>

    </div>
  );
}

export default App;
