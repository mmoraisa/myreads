import React, { Component } from 'react'

class Book extends Component{
    render() {
        const { title, authors, imageLinks, shelf } = this.props.book
        const { handleShelfChange } = this.props

        return (
            <li className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={handleShelfChange}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </li>
        )
    }
}

export default Book