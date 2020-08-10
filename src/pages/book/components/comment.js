import React from 'react';
import styled from 'styled-components';

import DeleteIcon from '@material-ui/icons/Delete';

const Container = styled.div`
    /* border: 1px solid rgba(0, 0, 0, 0.4); */
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
    border-left: 16px solid ${props => props.color};
    width: 100%;
    ${props => props.empty ? 'background: ' + props.color : ''};
    /* padding: 8px; */
    display: flex;
    margin-bottom: 16px;
`

const DeleteBar = styled.div`
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border-left: 1px solid black; */
    background: #707070;
    /* background: black; */
    color: #fafafa;
    cursor: pointer;
    /* border: 1px solid blue; */
`

const P = styled.p`
    margin: 0;
    flex-grow: 1;
    /* border: 1px solid blue; */
    padding: 8px;
    /* display: flex;
    align-content: center; */
    cursor: pointer;
`

export default function Comment(props){
    // console.log(props)
    return(
        <Container color={props.color} empty={props.comment.trim() ? false : true}>
            <P onClick={() => props.handleRangeClick(props.range)}>{props.comment}</P>
            <DeleteBar onClick={props.handleDelete(props.index)}><DeleteIcon/></DeleteBar>
        </Container>    
    )
}