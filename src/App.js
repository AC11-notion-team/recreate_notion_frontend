
import React from 'react';
import './App.css';
<<<<<<< HEAD
import PageHeader from "./Components/PageHeader";
import Editor from './Components/Editor';
import EditableBlock from "./Components/EditableBlock";
import Header from "./Components/Navbar/Header";
import { useState } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
=======
import EditableBlock from "./Components/EditableBlock/other/index.jsx";
import Features from "./Components/EditableBlock/other/Features.jsx";
import Slideshow from './Components/EditableBlock/other/Slideshow.jsx';
import StartNotion from './Components/EditableBlock/other/StartNotion.jsx';
import Resources from './Components/EditableBlock/other/Resources.jsx';
>>>>>>> 529a7bfe7a654be13e0e89b9046d2a27c268dd54


function App() {
  const [isSide,setIsSide] = React.useState(true)
  function toggleSide (){
      setIsSide(prveSide => !prveSide)
  }
  const [isFavorite,setIsFavorite] = React.useState(false)
  function toggleFavorite(){
      setIsFavorite(prevIsFavorite => !prevIsFavorite)
  }

  return (
<<<<<<< HEAD
    <div className="flex">
      <div className='w-3/12'>
        < Sidebar isFavorite={isFavorite} toggleFavorite={toggleFavorite} state={isSide} toggle={toggleSide} />
      </div>
      <div className="w-9/12">
        < Header isFavorite={isFavorite} toggleFavorite={toggleFavorite} state={isSide} toggle={toggleSide} />  
        < PageHeader />
        < Editor />
      </div>
    </div>  
  )
=======
    <div className="App">
      <EditableBlock />
      <Features />
      <Slideshow />
      <StartNotion />
      <Resources />
    </div>
  );
>>>>>>> 529a7bfe7a654be13e0e89b9046d2a27c268dd54
}
export default App;
