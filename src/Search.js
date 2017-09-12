import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Search extends Component{
    state = {
        query: ''
    }
    handleOnChangeSearch = (e) => {
        this.setState({
            query: e.target.value
        })
    }
    render() {
        const { handleShelfChange, books } = this.props

        let showingBooks;
        if(this.state.query){
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingBooks = books.filter(book => match.test(book.title))
        } else {
            showingBooks = books;
        }

        showingBooks.sort(sortBy('name'))

        return (
            <div className="search">
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/" className="close-search">Close</Link>
                        <div className="search-books-input-wrapper">
                            {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                            */}
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