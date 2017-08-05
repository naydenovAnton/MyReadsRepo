import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'

class BooksList extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        shelf: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    setShelfTitle = (shelf) => {

        let title

        switch (shelf) {
            case 'currentlyReading' :
                title = 'Currently Reading'
                break;
            case 'wantToRead':
                title = 'Want to Read'
                break;
            case 'read':
                title = 'Read'
                break;
            default:
                title = ''
        }

        return title
    }

    render() {

        const { books, shelf, onChangeShelf } = this.props

        let shelfTitle = this.setShelfTitle(shelf)

        let showingBooks
        showingBooks = books.filter((book) => book.shelf === shelf)

        showingBooks.sort(sortBy('title'))

        return (

            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{ shelfTitle }</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {showingBooks.map((book, index) => (
                                <Book
                                    onChangeShelf={ onChangeShelf }
                                    book={ book }
                                    key={ index }
                                />
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default BooksList