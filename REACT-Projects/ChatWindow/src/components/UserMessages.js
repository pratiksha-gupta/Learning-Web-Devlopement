import React from "react"
import "../App.css";

function UserMessages(props){

return(
          <ul className="message-list">
            {props.messages.map((message, index) => (
              <li
                key={index}
                className={
                  message.username === props.username
                    ? "message sender"
                    : "message recipient"
                }
              >
                <p>{`${message.username}: ${message.text}`}</p>
              </li>
            ))}
          </ul>
);


}

export default UserMessages;
