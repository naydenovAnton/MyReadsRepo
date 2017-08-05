import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    constructor(props) {

        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        const { book, onChangeShelf } = this.props
        onChangeShelf(book, event.target.value)
    }

    render() {

        const { book } = this.props

        const coverImageDimension = {
            width: 128,
            height: 193
        }

        const shelfSelectList = [
            {
                title: 'Move to...',
                value: 'disabled',
                disabled: true
            },
            {
                title: 'Currently Reading',
                value: 'currentlyReading',
                disabled: false
            },
            {
                title: 'Want to Read',
                value: 'wantToRead',
                disabled: false
            },
            {
                title: 'Read',
                value: 'read',
                disabled: false
            },
            {
                title: 'None',
                value: 'none',
                disabled: false
            }
        ]

        return (

            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: coverImageDimension.width,
                            height: coverImageDimension.height,
                            backgroundImage: `url(${book.imageLinks &&
                                                    book.imageLinks.smallThumbnail ?
                                                    book.imageLinks.smallThumbnail : ''
                                                    })`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={ this.handleChange } value={ book.shelf }>
                                {shelfSelectList.map((option, index) => (
                                    <option key={ index }
                                            disabled={ option.disabled }
                                            value={ option.value }
                                    >{option.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{ book.title }</div>
                    <div className="book-authors">
                        { book.authors ? book.authors.join(", ") : 'Unknown authors' }
                    </div>
                </div>
            </li>
        )
    }
}

export default Book