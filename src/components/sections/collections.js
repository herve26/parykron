import React from 'react';
import Book from '../book';

export default function Collections(){
    const handleClick = e => {
        console.log(e)
    }
    return (
        <Book link="book" handleClick={handleClick}/>
    )
}