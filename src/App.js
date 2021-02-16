import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginOrLogout from './components/authentification/loginOrLogout';
import Login from './components/login';
import Logout from './components/logout';
import User from './components/users';
import { ProfileUser } from './components/users/profileUser';
import Article from './pages/Article';
import Home from './pages/Home';
import CreateReview from './components/review/CreateReview';
import UpdateReview from './components/review/UpdateReview';
import Game from './components/Game/Game';


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
            <LinkContainer to="/article/game">
              <Nav.Link className="navItem">Jeux-vidéo</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
              <Nav.Link>Administration</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <LoginOrLogout></LoginOrLogout>
      </Navbar>
      <div className="container-fluid p-0">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/article/:genre">
            <Article />
          </Route>
          <Route path="/article/game/:id">
            <Game />
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/logout">
            <Logout></Logout>
          </Route>
          <Route path="/users">
            <User></User>
          </Route>
          <Route exact path="/profile/:id" component={ProfileUser}></Route>
          <Route path="/create-review" component={CreateReview}></Route>
          <Route path="/update-review/:id" component={UpdateReview}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;