
import React from 'react';
import './App.css';
import PageHeader from "./Components/PageHeader";
import Editor from './Components/Editor';
import EditableBlock from "./Components/EditableBlock";
import Header from "./Components/Navbar/Header";
import { useState } from 'react';
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
    <div className="flex ">
      <div>
        {/* <div className='w-2/12'>
            <Sidebar isFavorite={isFavorite} toggleFavorite={toggleFavorite} state={isSide} toggle={toggleSide} />
        </div> */}
      </div>
      <div>
        <div className="w-screen">
            <Header isFavorite={isFavorite} toggleFavorite={toggleFavorite} state={isSide} toggle={toggleSide}/>  
        </div>
        <h1 className="text-3xl font-bold underline"></h1>
        < PageHeader />
        < Editor />
      </div>
    </div>  
  )
}
export default App;
