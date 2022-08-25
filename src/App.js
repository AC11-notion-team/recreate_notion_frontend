import React from 'react';
import logo from './logo.svg';
import './App.css';
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
    <div className="flex justify-end">
      <div>
          <Sidebar isFavorite={isFavorite} toggleFavorite={toggleFavorite} state={isSide} toggle={toggleSide} />
      </div>
      <div className="w-10/12">
        <header className="content-header">
          <Header isFavorite={isFavorite} toggleFavorite={toggleFavorite} state={isSide} toggle={toggleSide}/>
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
        
        <h1 className="text-3xl font-bold underline"></h1>
        <EditableBlock />
      
      </div>
    </div>
  );
}

export default App;
