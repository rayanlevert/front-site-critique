import logo from '../logo.svg';
export default function Home() {

    return (
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Formation React</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    );
}