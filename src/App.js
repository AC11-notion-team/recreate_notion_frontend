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
      {isSide && <div className='w-2/12 h-full md:w-4/12'>
        <div>
            <Sidebar isFavorite={isFavorite} toggleFavorite={toggleFavorite} state={isSide} toggle={toggleSide} />
        </div>
      </div>}
      <div className="flex-grow">
        <div >
            <Header isFavorite={isFavorite} toggleFavorite={toggleFavorite} state={isSide} toggle={toggleSide}/>  
        </div>

        < PageHeader />
        < Editor />
      </div>
    </div>  
  )
}
export default App;
