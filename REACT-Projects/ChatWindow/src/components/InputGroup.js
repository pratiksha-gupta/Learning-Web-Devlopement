import React, { useState } from "react"
import "../App.css";

function InputGroup(props){

  const [text , setText] = useState("");

  function handleChnage(event){
    const newtext = event.target.value;
    setText(newtext);
  }

  function isTextEmpty(){
    if (text === "")
    {return true}
    else 
    {return false}
  }

  function handleClick(event){
    event.preventDefault();
    props.onSend({username:props.username,text:text}) 
    setText("");
    console.log("after setting the text");
  }
   
return (
<div>
 <form className="input-group">
   <input
     type="text"
     className="form-control"
     placeholder="Enter your message..."
     onChange={handleChnage}
     value={text}
   />
   <div className="input-group-append">
     <button className="btn submit-button" disabled={isTextEmpty()?true:false} onClick={handleClick}>
       SEND
     </button>
   </div>
 </form>
</div>
);
}

export default InputGroup;

