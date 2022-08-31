import React,{ useState } from 'react';
import './App.css';
import PageHeader from "./Components/PageHeader";
import Editor from './Components/Editor';
// import EditableBlock from "./Components/EditableBlock";
import Header from "./Components/Navbar/Header";
import Sidebar from './Components/Sidebar/Sidebar';


function App() {
  const [isSide,setIsSide] = useState(true)
  const toggleSide = () =>(setIsSide(prveSide => !prveSide))

  const [isFavorite,setIsFavorite] = useState(false)
  const toggleFavorite = () => (setIsFavorite(prevIsFavorite => !prevIsFavorite))

  return (
    <div className="flex">
      {isSide && <div className='w-2/12'>
        <div>
            <Sidebar isFavorite={isFavorite} toggleFavorite={toggleFavorite} state={isSide} toggle={toggleSide} />
        </div>
        <div>
          
        </div>
      </div>}
      <div className="flex-grow">
        <div >
            <Header isFavorite={isFavorite} toggleFavorite={toggleFavorite} state={isSide} toggle={toggleSide}/>  
        </div>
        <h1 className="text-3xl font-bold underline">hi</h1>
        < PageHeader />
        < Editor />
      </div>
    </div>  
  )
}
export default App;
