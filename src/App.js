import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'

class BooksApp extends React.Component {
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
    const shelf = e.target.value;
    const books = this.state.books;

    let foundIndex = null;

    books.forEach((currentBook,index) => {
      if(currentBook.id === book.id)
        foundIndex = index
    })

    if(foundIndex !== null){
      books[foundIndex].shelf = shelf
    }
    else{
      BooksAPI.update(book,shelf)
        .then(data => { this.addNewBook(book) })
    }

    this.setState({
      books: books
    })
    BooksAPI.update(book,shelf);
  }
  addNewBook = (book) => {
    BooksAPI.get(book.id).then(book => {
      this.setState({
        books: this.state.books.concat([ book ])
      })
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} handleShelfChange={this.handleShelfChange}/>
        )}/>
        <Route exact path="/search" render={() => (
          <Search books={this.state.books} handleShelfChange={this.handleShelfChange}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
