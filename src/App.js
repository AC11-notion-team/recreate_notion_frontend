import logo from './logo.svg';
// import './App.css';
import EditableBlock from "./Components/EditableBlock";
import Header from "./Components/Navbar/Header";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  return (
    <div className="flex ">
        <div className="">
          <Sidebar />
        </div>
        <div className="">
          <header className="content-header">
            <Header />
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
    </div>
  );
}

export default App;
