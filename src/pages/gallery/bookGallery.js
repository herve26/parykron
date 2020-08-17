import React, { Fragment } from 'react';
import styled from 'styled-components';

import Book from './components/book';
import { addBook, getBasename } from '../../utils/book';

const MainWrapper = styled.main`
    padding: 12px 48px;
    padding-bottom: 24px;
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 256px);
    grid-gap: 1rem;
    justify-content: space-between;
    overflow-y: auto;
    height: calc(100vh - 24px - 48px);
`

export default function BookGallery(props){
    const bookComponents = props.books.sort((b1, b2) => b2.doc.updated_at - b1.doc.updated_at).map((book, index) => {
        return <Book key={index} cover={getBasename(book.doc.coverPath)} 
                index={index} title={book.doc.title} author={book.doc.author} handleClick={props.handleBookClicked} />
    })

    return(
        <Fragment>
            <MainWrapper className="scrollbar">
                {bookComponents}
            </MainWrapper>
        </Fragment>
    )
}
