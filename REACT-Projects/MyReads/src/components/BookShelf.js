import React from "react";
import "../App.css";
import Book from "./Book";

function BookShelf(props){

    const books = props.shelfbooks;

    return (
    <div className="bookshelf">
                <h2 className="bookshelf-title">{props.name}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      books.map((book)=>
                       <li key={book.id} >
                           <Book bookCover={book.imageLinks.thumbnail}  bookStatus = {book.shelf} 
                            bookTitle={book.title}   bookAuthors={book.authors} onUpdate ={props.updateBookshelf} book={book}/> 
                        </li> 
                      )
                    }
                  </ol> 
                </div>      
    </div>
    );

}

export default BookShelf;