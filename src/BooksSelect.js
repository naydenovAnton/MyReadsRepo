import React, {Component} from 'react'
import {Link} from  'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import DebounceInput from 'react-debounce-input';
import Book from './Book'

class BooksSelect extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        getBooksForQuery: PropTypes.func.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    componentWillUnmount() {

        const { onBackToShelf } = this.props
        onBackToShelf()
    }

    updateFilter = (query) => {
        this.props.getBooksForQuery(query)
    }

    render() {

        const { books, query, onChangeShelf } = this.props

        books.sort(sortBy('title'))

        return (

            <div className="search-books">
                <div className="search-books-bar">

                    <Link
                        to="/"
                        className="close-search"
                    />

                    <div className="search-books-input-wrapper">

                        <DebounceInput
                            minLength={ 1 }
                            debounceTimeout={ 300 }
                            placeholder="Search by title or author"
                            value={ query }
                            onChange={event => this.updateFilter(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book, index) => (
                            <Book
                                onChangeShelf={ onChangeShelf }
                                book={ book }
                                key={ index }
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BooksSelect