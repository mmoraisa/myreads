import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component{
    state = {
        books: []
    }
    componentDidMount = () => {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            })
        })
    }
    handleShelfChange = (e,book) => {
        const books = this.state.books;
        books.every((currentBook,i) => {
            if(currentBook.id == book.id){
                books[i].shelf = e.target.value
                return false;
            }
            else return true;
        })
        this.setState({
            books: books
        })
    }
    render() {
        const currentlyReadingBooks = [];
        const wantToReadBooks = [];
        const readBooks = [];

        this.state.books.forEach(book => {
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
            }
        });

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf name="Currently Reading" books={currentlyReadingBooks} handleShelfChange={this.handleShelfChange} status="currentlyReading"/>
                        <Bookshelf name="Want to Read" books={wantToReadBooks} handleShelfChange={this.handleShelfChange} status="wantToRead"/>
                        <Bookshelf name="Read" books={readBooks} handleShelfChange={this.handleShelfChange} status="read"/>
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