
import React, { useState } from 'react';
import './App.css';
import PageHeader from "./Components/PageHeader";
import Editor from './Components/Editor';
import Header from "./Components/Navbar/Header";
import Sidebar from './Components/Sidebar/Sidebar';


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
}
export default App;
