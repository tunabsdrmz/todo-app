import React, { useEffect, useState } from "react";
import MobileLight from "./Assets/images/bg-mobile-light.jpg"
import MobileDark from "./Assets/images/bg-mobile-dark.jpg"
import DesktopLight from "./Assets/images/bg-desktop-light.jpg"
import DesktopDark from "./Assets/images/bg-desktop-dark.jpg"
import "./style.css"
import Icon from "./Components/Icon";
import Input from "./Components/Input";


function App() {
  const [darkMode , setDarkMode] = useState(false)
  const [windowSize , setWindowSize] = useState(window.innerWidth)
  const [notes , setNotes] = useState([])
  const [input , setInput] = useState('')
  const [completeTODOS , setCompleteTODOS]= useState(false)
  const [allTODOS , setAllTODOS]= useState(true)
  const [activeTODOS , setActiveTODOS]= useState(false)
  const [COMPLETE , setCOMPLETE] = useState([])
  const [ACTİVE , setACTİVE] = useState([])


  useEffect(()=>{
    const windowWidth = () => setWindowSize(window.innerWidth)
    window.addEventListener('resize' , windowWidth)
    return () =>{
      window.removeEventListener('resize' , windowWidth)
    } 
  },[])
  function darkModeToggler(){
    setDarkMode(!darkMode)
  }
  const MobileLightco = {
     backgroundImage: `url(${MobileLight})`
  }
  const MobileDarkco = {
    backgroundImage: `url(${MobileDark})`
 }
 const DesktopLightco ={
  backgroundImage: `url(${DesktopLight})`
 }
 const DesktopDarkco ={
  backgroundImage: `url(${DesktopDark})`
 }
 function DeleteNote(id){
  setNotes(prevNotes => prevNotes.filter(items => items.id !== id ))
 }
 function DeleteNoteCOMPLETE(id){
  setCOMPLETE(prevComp => prevComp.filter(items => items.id !== id ))
 }

 function DeleteNoteACTİVE(id){
    setACTİVE(setAc => setAc.filter(items => items.id !== id))
 }

 function handleCheck(id){
  setCOMPLETE(prevComp => prevComp.map(eli => eli.id === id? {...eli, isCompleted:!eli.isCompleted}: eli ))
  setNotes(prevNotes => prevNotes.map(el => el.id === id ? {...el, isCompleted:!el.isCompleted}: el))
  setACTİVE(prevAc => prevAc.map(elin => elin.id === id ? {...elin, isCompleted:!elin.isCompleted}: elin ))
 }
 function handleCheckCOMPLETE(id){
  setCOMPLETE(prevComp => prevComp.map(eli => eli.id === id ? {...eli, isCompleted:!eli.isCompleted}: eli ))
 }


 function handleCheckACTİVE(id){
  setACTİVE(prevAc => prevAc.map(elin => elin.id === id ? {...elin, isCompleted:!elin.isCompleted}: elin ))
 }


 function clearCompleted(){
  setNotes(prevNotes => prevNotes.filter(items => items.isCompleted !== true))
  setCOMPLETE(prevComp => prevComp.filter(item => item.isCompleted !== true))
  setACTİVE(prevAc => prevAc.filter(ite => ite.isCompleted !== true))
 }
 function completed(){
  setCOMPLETE(prevComp => prevComp.filter(item => item.isCompleted !== false))
  setActiveTODOS(false)
  setCompleteTODOS(true)
  setAllTODOS(false)
 }
 
 function ALL(){
  setAllTODOS(true)
  setActiveTODOS(false)
  setCompleteTODOS(false)
 }

 function ActivE(){
  setACTİVE(prevAc => prevAc.filter(item => item.isCompleted !== true))
  setAllTODOS(false)
  setActiveTODOS(true)
  setCompleteTODOS(false)
 }
 
  return (
    <div className="App">
     <div className="background-img" style={windowSize <= 950 ? darkMode ? MobileDarkco : MobileLightco : darkMode ? DesktopDarkco : DesktopLightco}>
        <div className="title-and-switch-icon">
          <h1 className="title">TODO</h1>
          <Icon 
          toggle={darkModeToggler}
          darkMode={darkMode}
          />
        </div>
        <div className="input-div">
          <Input 
          notes={notes}
          darkMode={darkMode}
          setNotes={setNotes}
          input={input}
          setInput={setInput}
          setCOMPLETE={setCOMPLETE}
          setACTİVE={setACTİVE}
          />
        </div>
     </div>
     <div className={darkMode ? 'dark-empty-color':'empty-color'}>
        <div className={darkMode ? "allNotesAndLeft-div dark": "allNotesAndLeft-div light"}>
          

          {completeTODOS && COMPLETE?.map(comp => {
            return(
          <div key={comp.id} className="notes-div">
            <div className="custom-checkbox">
                <div className={comp.isCompleted ? "notesCheckbox ncActive": "notesCheckbox"} onClick={() => handleCheckCOMPLETE(comp.id)}></div>
              </div>
              <div  className={comp.isCompleted ? "singleNote checked" :"singleNote"}  >{comp.todo}</div>
              <div className="crossSymbol" onClick={()=> DeleteNoteCOMPLETE(comp.id)} ></div>
          </div>
          
            )})}

          {allTODOS && notes?.map(note =>{
            return(<div key={note.id} className="notes-div">
              <div className="custom-checkbox">
                <div className={note.isCompleted ? "notesCheckbox ncActive" : "notesCheckbox"} onClick={() => handleCheck(note.id)}></div>
              </div>
              <div className={note.isCompleted ? "singleNote checked" :"singleNote"}  >{note.todo}</div>
              
              <div className="crossSymbol" onClick={()=> DeleteNote(note.id)} ></div>
            </div>
          )})}

          {activeTODOS && ACTİVE?.map(activ =>{
            return(<div key={activ.id} className="notes-div">
              <div className="custom-checkbox">
                <div className={activ.isCompleted ? "notesCheckbox ncActive": "notesCheckbox"} onClick={() => handleCheckACTİVE(activ.id)}></div>
              </div>
              <div className={activ.isCompleted ? "singleNote checked" :"singleNote"}  >{activ.todo}</div>
              
              <div className="crossSymbol" onClick={()=> DeleteNoteACTİVE(activ.id)} ></div>
            </div>
          )})}


          <div className="mobileBottomSection">
          <p>{notes.length } items left</p>
          <p className={allTODOS ? "active-p-left":"All-mobile"} onClick={ALL}>All</p>
          <p className={activeTODOS ? "active-p":"Mobile-Active"} onClick={ActivE}>Active</p>
          <p className={completeTODOS ? "active-p-right":"Mobile-complete"} onClick={completed}>Completed</p>
          <p className="clearCompleted" onClick={clearCompleted}>Clear Completed</p>
          </div>
          
          <div className="notes-left-div">
            <p>{notes.length} items left</p>
            <p className="clearCompleted" onClick={clearCompleted}>Clear Completed</p>
          </div>
        </div>
        <div className={darkMode ? "changingP-MainDiv dark" : "changingP-MainDiv light"}>
          <p onClick={ALL} className={allTODOS ? "active-p":"Mobile-Active"}>All</p>
          <p onClick={ActivE} className={activeTODOS ? "active-p":"Mobile-Active"}>Active</p>
          <p onClick={completed} className={completeTODOS ? "active-p":"Mobile-Active"}>Completed</p>
        </div>
     </div>
    </div>
  );
}

export default App;
