import React, { Fragment } from 'react';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

import Book from './book';
import { addBook, getBasename } from '../utils/book';

const MainWrapper = styled.main`
    margin: 0 48px;
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 256px);
    grid-gap: 1rem;
    justify-content: space-between;
`

const AddButton = styled.button`
    border: 1px solid red;
    margin-left: 48px;
    margin-top: 48px;
    border: none;
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`

export default function BookGallery(props){
    const bookComponents = props.books.sort((b1, b2) => b2.doc.updated_at - b1.doc.updated_at).map((book, index) => {
        return <Book key={index} cover={getBasename(book.doc.coverPath)} 
                index={index} title={book.doc.title} author={book.doc.author} handleClick={props.handleBookClicked} />
    })

    return(
        <Fragment>
            <AddButton type="button" onClick={props.handleAddBook(addBook)}><AddIcon/></AddButton>
            <MainWrapper>
                {bookComponents}
            </MainWrapper>
        </Fragment>
    )
}
