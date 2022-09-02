import EditableBlock from "./Subunit/";
import Features from "./Subunit/Features.jsx.js";
import Slideshow from './Subunit/Slideshow.jsx.js';
import StartNotion from './Subunit/StartNotion.jsx.js';
import Resources from './Subunit/Resources.jsx.js';


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