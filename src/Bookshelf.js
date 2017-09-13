import React, { Component } from 'react'
import Book from './Book'
import sortBy from 'sort-by'

class Bookshelf extends Component{
    render() {
        const { name, books, handleShelfChange} = this.props;

        const showingBooks = books.sort(sortBy('name'))

        return (
            <div className="bookshelf">
                {showingBooks.length > 0 && (
                    <div>
                        {name && (<h2 className="bookshelf-title">{name}</h2>)}
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {showingBooks.map(book => (
                                    <Book key={book.id} book={book} handleShelfChange={(e) => {
                                        handleShelfChange(e,book)
                                    }}/>
                                ))}
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Bookshelf