import React,{ useState,useEffect,useLayoutEffect } from 'react';
import './App.css';
import PageHeader from "./Components/PageHeader";
import Editor from './Components/Editor';
// import EditableBlock from "./Components/EditableBlock";
import Header from "./Components/Navbar/Header";
import Sidebar from './Components/Sidebar/Sidebar';
import Split from 'split.js'




function App() {
  const [isSide,setIsSide] = useState(true)
  const toggleSide = () =>(setIsSide(prveSide => !prveSide))

  const [isFavorite,setIsFavorite] = useState(false)
  const toggleFavorite = () => (setIsFavorite(prevIsFavorite => !prevIsFavorite))

  useLayoutEffect(()=>{
    if(isSide===true){
      Split(["#split-0", "#split-1"], {
        sizes: [22, 78],
        maxSize: [500, Infinity],
        minSize: [200, 200],
        gutterSize: 2,
        dragInterval: 2,
        gutterAlign: 'start'
      })
    }
  },[isSide])
  
  return (
    <div>
      <div class="split" className="h-screen w-full flex" >
        {isSide && <div id="split-0" className="relative w-60 flex-grow-0">
          <div >
              <Sidebar isFavorite={isFavorite} toggleFavorite={toggleFavorite} toggle={toggleSide} />
          </div>
        </div>}

        <div id="split-1" className="flex-grow w-full overflow-x-hidden">
          <Header isFavorite={isFavorite} toggleFavorite={toggleFavorite} isSide={isSide} toggleSide={toggleSide}/>  
          < PageHeader />
          < Editor />
        </div>
      </div>  
    </div>
    
  )
}
export default App;
