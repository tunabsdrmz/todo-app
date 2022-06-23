import React from "react";
function Input({ notes,darkMode,setNotes, input, setInput,setCOMPLETE,setACTİVE }){

    function createNote(){ 
        if(input === ''){
            window.alert('please write a todo.')
        }
        else if(input !== ''){
        setNotes(prevNotes => [{ id:input, todo:input, isCompleted:false} , ...prevNotes])
        setCOMPLETE(prevComp => [{ id:input, todo:input, isCompleted:false} , ...prevComp])
        setACTİVE(prevAc => [{id:input, todo:input, isCompleted:false} , ...prevAc])
        setInput('')
        }
        
    }
    return(
        <>
        <div onClick={createNote} className="custom-checkbox">
            <div className="checkbox"></div>
        </div>
        <input onChange={(e) => setInput(e.target.value)} className={darkMode ? "input-box dark": "input-box"} type="text" placeholder="Create a new todo..."/>
        </>
    )
}
export default Input;