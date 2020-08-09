import React from 'react';
import styled from 'styled-components';


const BookImageWrapper = styled.div`
    width: 256px;
`

const BookImage = styled.img`
    width: 100%;
`

const BookWrapper = styled.div`
    margin-bottom: 24px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.20);
    &:hover{
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1), 
                0 2px 4px rgba(0,0,0,0.1), 
                0 4px 8px rgba(0,0,0,0.1), 
                0 8px 16px rgba(0,0,0,0.1),
                0 16px 32px rgba(0,0,0,0.1), 
                0 32px 64px rgba(0,0,0,0.1);
    }
`

export default function Book(props){
    return (
        <BookWrapper>
                <BookImageWrapper>
                    <BookImage onClick={props.handleClick(props.index)} src={`http://localhost:${window.serverPort}/cover/${props.cover}`} alt="The Drowned"/>
                </BookImageWrapper>
        </BookWrapper>
    )
}