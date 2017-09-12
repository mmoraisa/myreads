import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class ListBooks extends Component{
    render() {
        const { handleShelfChange, books } = this.props
        
        const currentlyReadingBooks = []
        const wantToReadBooks = []
        const readBooks = []

        books.forEach(book => {
            switch(book.shelf){
                case 'currentlyReading':
                    currentlyReadingBooks.push(book);
                    break;
                case 'wantToRead':
                    wantToReadBooks.push(book);
                    break;
                case 'read':
                    readBooks.push(book);
                    break;
                default:
                    break;
            }
        });

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf name="Currently Reading" books={currentlyReadingBooks} handleShelfChange={handleShelfChange} status="currentlyReading"/>
                        <Bookshelf name="Want to Read" books={wantToReadBooks} handleShelfChange={handleShelfChange} status="wantToRead"/>
                        <Bookshelf name="Read" books={readBooks} handleShelfChange={handleShelfChange} status="read"/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks