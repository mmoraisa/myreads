import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class Search extends Component{
    state = {
        query: '',
        searchBooks: []
    }
    handleOnChangeSearch = (e) => {
        const query = e.target.value
        
        if(query){
            BooksAPI.search(query,10).then(books => {
                if(!books.error){
                    this.setState({
                        searchBooks: books.map((searchBook) => {
                          let shelfBook = this.props.books
                              .find(propBook => propBook.id === searchBook.id);
                            if(shelfBook){
                                return shelfBook
                            } else{
                                searchBook.shelf = 'none';
                                return searchBook;
                            }
                        })

                    })
                }
            })
        }

        this.setState({
            query: query
        })
    }
    render() {
        const { handleShelfChange } = this.props

        let showingBooks = this.state.searchBooks;
        
        if(this.state.query){
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingBooks = showingBooks.filter(book => match.test(book.title))
        }

        showingBooks.sort(sortBy('name'))

        return (
            <div className="search">
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/" className="close-search">Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author" onChange={this.handleOnChangeSearch} value={this.state.query}/>
                        </div>
                    </div>
                    <div className="search-books-results">
                        <Bookshelf books={showingBooks} handleShelfChange={handleShelfChange} status="none"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search