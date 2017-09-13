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
    BooksAPI.update(book, shelf).then(() => {
      if (shelf === 'none') {
        this.setState({books: this.state.books.filter(b => b.id !== book.id)});
      } else {
        book.shelf = shelf;
        this.setState({books: this.state.books.filter((b) => b.id !== book.id).concat([book])});
      }
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
