import React from "react";
import { useState } from "react"
import "../App.css";


function Book(props){

  const [shelfOption , setShelfOption] = useState(props.bookStatus);

  console.log("Book details************");
  console.log(` ****** Book Title ${props.bookTitle} ********Book Shelf ${props.bookStatus}`)
  const au = ( typeof props.bookAuthors) === 'undefined'
  const bookurl = props.bookCover;

  function handleChange(event){
     const value = event.target.value;
     setShelfOption([value])
     console.log(value);
     props.onUpdate(props.book, value)
  }
  

  return(
    
    <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                              `url(${bookurl})`,
                            }}
                          ></div>
                          <div className="book-shelf-changer" >
                            <select value= { typeof shelfOption=== 'undefined' ? "none" : shelfOption} onChange={handleChange}  >
                              <option value="move" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead" >Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{props.bookTitle}</div>
                        
                        {
                          (!au) &&
                          props.bookAuthors.map((author)=>{return <div className="book-authors">{author}</div>})
                        }
                        
                        
    </div>
  
                 
  );
}

export default Book;