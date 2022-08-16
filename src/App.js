import logo from './logo.svg';
import './App.css';
import EditableBlock from "./Components/EditableBlock";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
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
        </a> */}
      </header>
      
      <h1 className="text-3xl font-bold underline">here</h1>
      <EditableBlock />
      
    </div>
  );
}

export default App;
