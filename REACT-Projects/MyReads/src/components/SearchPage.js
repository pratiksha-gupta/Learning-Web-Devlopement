import React from "react";
import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Book from "./Book";
import  * as BooksAPI from "../BooksAPI";

function SearchPage(props){

const [searchResults, setSearchResults] = useState([]);
const [searchText, setSearchText] = useState("");

let books = props.currentShelfbooks;
console.log("current Shelf Books");
console.log(books)


function handleChange(event){
  const newSearchText = event.target.value;
  setSearchText(newSearchText);
  const getSearchResults = async ()=>{
     //console.log("what search quesry is gng to API  is gng into ")
     //console.log([newSearchText])
     const res = await BooksAPI.search(newSearchText);
     console.log("Response Data")
     console.log(res);
     const isArray = Object.prototype.toString.call(res) === '[object Array]'
     //console.log("did we get result??s*******")
     //console.log(isArray) 
     
     // if we get results from 
     if (isArray){
      //find the books in response which are persent in current Books state
      for(let i=0 ; i < books.length; i++ ){
          for(let j=0; j< res.length ; j++)
          {
                if(books[i].id === res[j].id){
                  res[j].shelf = books[i].shelf
                  console.log(res[j].title )
                }

          }
      }
      console.log("updated response")
      console.log(res);
      setSearchResults(res)
     }
     else {
      setSearchResults([])
      setTimeout(() => {
        alert("This is invalid query, Try again")
      }, 1000);
    }


  };

getSearchResults();
  
}





return (
<div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search" > Close </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text" onChange={handleChange} 
                placeholder="Search by title, author, or ISBN"
                value={searchText}
              />
            </div>
          </div>
          <div className="search-books-results">
          <ol className="books-grid">
          {
          
          searchResults.length>0 && searchResults.map((searchBook) => { 
          console.log(`Book title ${searchBook.title} Book shelf ${searchBook.shelf}`)
          return <li key={searchBook.id}>
          <Book bookCover={searchBook.imageLinks.thumbnail}  bookStatus = {searchBook.shelf} bookTitle={searchBook.title}   
          bookAuthors={searchBook.authors} onUpdate ={props.updateBookshelf} book={searchBook} /> </li>})
          }
          </ol>
      </div>
</div>
);     
}

export default SearchPage;