import logo from './logo.svg';
// import './App.css';
import PageHeader from "./Components/PageHeader";
import Header from "./Components/Navbar/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Editor from './Components/Editor';

function App() {
  return (
    <div className="flex w-full">
        <div className="w-3/12">
          <Sidebar />
        </div>
        <div className="w-9/12">
          < Header />
          < PageHeader />
          < Editor />
      </div>
    </div>
  );
}

export default App;
