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
