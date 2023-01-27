import logo from "./logo.svg";
import "./App.css";
import ChatWindow from "./components/ChatWindow"; 
import React , {useState} from "react";



const users = [{username:"Amy"},{username:"Jake"}];


const App = () => {

const [messages, setMessages] = useState([]);

function addMessage(message){
  setMessages((prevMessages)=>{return [...prevMessages,message]});
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">ReactND - Coding Practice</h1>
      </header>
      <div className="container">
        {
          users.map((user)=> <ChatWindow key={user.username}
            username={user.username}
            messages={messages}
            onSend={addMessage}/>)
        }
      </div>
    </div>
  );
};

export default App;
