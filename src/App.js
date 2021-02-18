import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
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
import SignIn from './components/authentification/signin';
import ProtectedAdminRoute from './components/authentification/ProtectedAdminRoute';
import Administration from './components/authentification/Administration';
import ProtectedProfileRoute from './components/users/ProtectedProfile';

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
            <Administration></Administration>
          </Nav>
          <LoginOrLogout></LoginOrLogout>
        </Navbar.Collapse>
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
          <Route path="/signin">
            <SignIn></SignIn>
          </Route>
          <ProtectedAdminRoute exact path="/admin/users" redirectTo="/home">
            <User></User>
          </ProtectedAdminRoute>
          <ProtectedProfileRoute exact path="/profile/:id" component={ProfileUser}></ProtectedProfileRoute>
          <Route path="/create-review" component={CreateReview}></Route>
          <Route path="/update-review/:id" component={UpdateReview}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;