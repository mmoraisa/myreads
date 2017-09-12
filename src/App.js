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
    books.every((currentBook,i) => {
        if(currentBook.id === book.id){
            books[i].shelf = shelf
            return false;
        }
        else return true;
    })
    this.setState({
        books: books
    })
    BooksAPI.update(book,shelf);
  }
  render() {
    const categorizedBooks = [];
    const uncategorizedBooks = [];

    this.state.books.forEach(book => {
      if(book.shelf !== 'none')
        categorizedBooks.push(book);
      else
        uncategorizedBooks.push(book);
    })

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={categorizedBooks} handleShelfChange={this.handleShelfChange}/>
        )}/>
        <Route exact path="/search" render={() => (
          <Search books={uncategorizedBooks} handleShelfChange={this.handleShelfChange}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
