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
                if(typeof books.map === 'function'){
                    this.setState({
                        searchBooks: books.map((searchBook) => {
                            if(this.props.books
                                .filter(propBook => propBook.id === searchBook.id)
                                .length === 0){
                                    return searchBook
                            } else{
                                return null
                            }
                        })
                        .filter(function(e){return e})
                    })
                }
            })
        }

        this.setState({
            query: query
        })
    }
    render() {
        const { handleShelfChange, books } = this.props

        let showingBooks = books.concat(this.state.searchBooks);
        
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