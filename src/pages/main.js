import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Header from "./header";
import BookPage from './book/book';
import Button from "../components/button";
import BookGallery from './gallery/bookGallery';
import { useGetAllBooks, updateBookMeta, bookUpdate } from '../utils/store'
import { addBook, addListeners } from '../utils/book';

const PageWrapper = styled.div`
    overflow: hidden;
    max-height: 100vh;
`

export default function Main(){

    const addingBookUuid = []
    const pages = ["gallery", "book"]

    const [ page, setPage ] = useState(pages[0])
    const [ books, reloadBooks, setAddedNewBook] = useGetAllBooks()
    const [ currentBook, setCurrentBook ] = useState(books[0] || {})

    const handleAddBook = () => { 
        addBook()
    }

    const handleBookClicked = b => e => {

        setCurrentBook(books[b])
        setPage(pages[1])
        bookUpdate.lastVisite(books[b])
    }

    const handleBackClicked = v => e => {
        setPage(pages[0])
        reloadBooks()
    }

    // Adding listener for the main process
    addListeners({loadBooks: reloadBooks})

    return (
        <PageWrapper>
            <Header handleAddBook={handleAddBook}>
                {page === pages[1] && <Button index={0} handleClick={handleBackClicked}>
                    <ChevronLeftIcon/>
                </Button>}
            </Header>
            { page === pages[0] ? 
                <BookGallery books={books} handleAddBook={handleAddBook} handleBookClicked={handleBookClicked} /> : 
                <BookPage book={currentBook} /> }
        </PageWrapper>
    )
}
