import React, { useState, Fragment } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Header from "./header";
import BookPage from './book/book';
import Button from "../components/button";
import BookGallery from './gallery/bookGallery';
import { useGetAllBooks, updateBookMeta, bookUpdate } from '../utils/store'



export default function Main(){

    const addingBookUuid = []
    const pages = ["gallery", "book"]

    const [ page, setPage ] = useState(pages[0])
    const [ books, reloadBooks, setAddedNewBook] = useGetAllBooks()
    const [ currentBook, setCurrentBook ] = useState(books[0] || {})

    const handleAddBook = newBook => async (e) => { 
        newBook(reloadBooks)
    }

    const handleBookClicked = b => e => {

        setCurrentBook(books[b])
        setPage(pages[1])
        // updateBookMeta(books[b])
        bookUpdate.lastVisite(books[b])
    }

    const handleBackClicked = v => e => {
        setPage(pages[0])
        reloadBooks()
    }

    return (
        <Fragment>
            <Header>
                {page === pages[1] && <Button index={0} handleClick={handleBackClicked}>
                    <ChevronLeftIcon/>
                </Button>}
            </Header>
            { page === pages[0] ? 
                <BookGallery books={books} handleAddBook={handleAddBook} handleBookClicked={handleBookClicked} /> : 
                <BookPage book={currentBook} /> }
        </Fragment>
    )
}
