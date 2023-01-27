import React from "react"
import "../App.css";
import UserMessages from "./UserMessages.js";
import InputGroup from "./InputGroup";

function ChatWindow(props){
   
  console.log("MESSAGES");
  console.log(props.messages)

    return (
        <div className="chat-window">
          <h2>Super Awesome Chat</h2>
          <div className="name sender">{props.username}</div>
          <UserMessages username={props.username} messages={props.messages}/>
          <InputGroup username = {props.username}  onSend={props.onSend}/>
        </div>
        
    );
}

export default ChatWindow;
