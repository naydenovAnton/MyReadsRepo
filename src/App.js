import React from 'react'
import { Link, Route } from  'react-router-dom'
import BooksList from './BooksList'
import BooksSelect from './BooksSelect'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

    state = {
        query: '',
        books: [],
        selectedBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    changeShelf = (updatedBook, newShelf) => {

        //Check if book is already on shelf
        let bookIndex = this.state.books.findIndex((book) => {
            return book.id === updatedBook.id;
        });

        BooksAPI.update(updatedBook, newShelf)

        this.setState((prevState) => {

            let newState = prevState

            //If book is already on shaft just update book object else add it to shelf array
            if (bookIndex !== -1) {

                newState.books = prevState.books
                newState.books[ bookIndex ].shelf = newShelf

            } else {

                updatedBook.shelf = newShelf
                newState.books = prevState.books.concat([ updatedBook ])

                //Also updates already filtered based on query books
                newState.selectedBooks = this.mergeQueryBooksWithExisting(prevState.selectedBooks, newState.books)
            }

            return {state: newState}
        });
    }

    clearQuery = () => {

        this.setState((prevState) => {

            let newState = prevState

            newState.query = ''
            newState.selectedBooks = []

            return {state: newState}
        });
    }

    mergeQueryBooksWithExisting = (selectedBooks, stateBooks) => {

        let mergedArray = selectedBooks.map(function (selectedBook) {

            let shellBook = stateBooks.filter(book => book.id === selectedBook.id)
            selectedBook.shelf = shellBook.length ? shellBook[ 0 ].shelf : 'none'
            return selectedBook
        });

        return mergedArray
    }

    getBooksForQuery = (query) => {

        this.setState({ query: query.trim() })

        if (query.trim() !== '') {
            BooksAPI.search(query, 20).then((result) => {

                if (!result.error) {
                    this.setState({ selectedBooks: this.mergeQueryBooksWithExisting(result, this.state.books)} )
                } else {
                    this.setState({ selectedBooks: [] })
                }
            })
        } else {
            this.setState({ selectedBooks: [] })
        }
    }

    render() {

        const { books, selectedBooks } = this.state

        return (
            <div className="app">
                <Route exact path="/search" render={() => (
                    <BooksSelect
                        books={ selectedBooks }
                        onBackToShelf={ this.clearQuery }
                        onChangeShelf={ this.changeShelf }
                        getBooksForQuery={this.getBooksForQuery}
                    />
                )}/>

                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>

                        <div className="list-books-content">
                            <BooksList
                                books={ books }
                                shelf="currentlyReading"
                                onChangeShelf={ this.changeShelf }
                            />

                            <BooksList
                                books={ books }
                                shelf="wantToRead"
                                onChangeShelf={ this.changeShelf }
                            />
                            <BooksList
                                books={ books }
                                shelf="read"
                                onChangeShelf={ this.changeShelf }
                            />
                        </div>
                        <div className="open-search">
                            <Link to="/search" >Add a book</Link>
                        </div>
                    </div>
                )}/>

            </div>
        )
    }
}

export default BooksApp
