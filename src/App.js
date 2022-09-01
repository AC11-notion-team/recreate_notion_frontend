import logo from './logo.svg';
import './App.css';
import EditableBlock from "./Components/EditableBlock/other/index.jsx";
import Features from "./Components/EditableBlock/other/Features.jsx";
import Slideshow from './Components/EditableBlock/other/Slideshow.jsx';
import StartNotion from './Components/EditableBlock/other/StartNotion.jsx';
import Resources from './Components/EditableBlock/other/Resources.jsx';


function App() {
  return (
    <div className="App">
      <EditableBlock />
      <Features />
      <Slideshow />
      <StartNotion />
      <Resources />
    </div>
  );
}

export default App;
