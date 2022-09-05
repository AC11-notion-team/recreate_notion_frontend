import React,{ useState,useEffect,useLayoutEffect } from 'react';
import './App.css';
import PageHeader from "./Components/PageHeader";
import Editor from './Components/Editor';
import Header from "./Components/Navbar/Header";
import Sidebar from './Components/Sidebar/Sidebar';
import Split from 'split.js'
import Calendar from './Components/Editor/Calendar';




function App() {
  const [isSide,setIsSide] = useState(true)
  const toggleSide = () =>(setIsSide(prveSide => !prveSide))

  const [isFavorite,setIsFavorite] = useState(false)
  const toggleFavorite = () => (setIsFavorite(prevIsFavorite => !prevIsFavorite))
  
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
      
      console.log(emojiObject.emoji);
      console.log(chosenEmoji);
  };
  const [title,setTitle] = useState("PageTitle")
  const handleChange = (e)=>{setTitle(e.target.value)}
  // const [title,setTitle] = useState({
  //     title:"Pagetitle",
  //     pageIcon:null
  // })
  // const handleChange = (event,emojiObject) =>{
  //   const {title,pageIcon} = event.target.value
  //   setTitle(prevTitle =>({
  //     ...prevTitle,
  //     title:title,
  //     pageIcon: pageIcon ? emojiObject.emoji : "🙃"
  //   }))
  // }

  useLayoutEffect(()=>{
    if(isSide){
      Split(["#split-0", "#split-1"], {
        sizes: [20, 80],
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
        {isSide && <div id="split-0" className="relative side-minW flex-grow-0">
          <div >
              <Sidebar isFavorite={isFavorite} toggleFavorite={toggleFavorite} toggle={toggleSide} chosenEmoji = {chosenEmoji} onEmojiClick = {onEmojiClick} title={title} handleChange={handleChange}/>
          </div>
        </div>}

        <div id="split-1" className="flex-grow w-full">
          <Header isFavorite={isFavorite} toggleFavorite={toggleFavorite} isSide={isSide} toggleSide={toggleSide}  chosenEmoji = {chosenEmoji} onEmojiClick = {onEmojiClick} title={title} handleChange={handleChange}/>  
          < PageHeader />
          < Editor />
          {/* <Calendar /> */}
        </div>
      </div>  
    </div>
    
  )
}
export default App;
// chosenEmoji = {chosenEmoji} onEmojiClick = {onEmojiClick} title={title} handleChange={handleChange}