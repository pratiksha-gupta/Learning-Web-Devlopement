import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./components/BookShelf";
import { Link }  from "react-router-dom";
import SearchPage from "./components/SearchPage";

const bookshelves = [{"name":"Currently Reading", "booksStatus": "currentlyReading"}, 
                     {"name":"Want to Read" ,"booksStatus":"wantToRead"}, 
                     {"name":"Read", "booksStatus":"read"}];

function App() {
  
const[books, setBooks] = useState([]);

  useEffect(()=>{
    console.log("first render")
    const getBooks = async ()=>{const res = await BooksAPI.getAll();
    
      setBooks(res);
      //console(res);
    };
    getBooks();
  },[])

  function updateBookshelf(book,newShelf){
    
    const updatedbook = async ()=>{ 
      await BooksAPI.update(book,newShelf)
      const res = await BooksAPI.getAll();
      console.log("***************")
      console.log("Books API state after update**********")
      console.log(res);

    let newBooks = [...books];

    // check if the book to be updated already exists or a new book
    const bookExists = (checkBook) => (checkBook.id === book.id)
    const ifBookExists = books.some(bookExists)
    
    //updating logic
    console.log("updating books state ")

    book.shelf = newShelf;
    console.log(book.shelf);

    if (!ifBookExists){
      console.log("adding a book")
      newBooks.push(book);
      setBooks(newBooks);
    }
    else{
    console.log("updating a book")
    newBooks = books.map((oldbook)=> (oldbook.id === book.id) ? {...oldbook, shelf:newShelf} : oldbook)
    console.log("***************")
    console.log(newBooks);
    setBooks(newBooks);
    }
    
    };
    updatedbook();
    
  }
  
  
  return (

    <Routes>
    <Route exac path="/" element={
    <div className="app">
      <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div >
              {
                  bookshelves.map((bookshelf)=> {
                  return <BookShelf  name={bookshelf.name} 
                  shelfbooks={books.filter((book)=> book.shelf === bookshelf.booksStatus)}
                  updateBookshelf = {updateBookshelf}

                  />
                  })
              }
                  
            </div>
          </div>
           
          <div className="open-search">
            <Link to="/search" >Add a book</Link>
          </div>
      </div>
    </div> }
    />
    <Route path="/search" element= {<SearchPage updateBookshelf = {updateBookshelf} currentShelfbooks= {books}/>} />
    </Routes>
  );
}

export default App;
