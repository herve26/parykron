import React, { Fragment } from 'react'
import styled from 'styled-components';
import Comment from '../components/comment';


const H3 = styled.h3`
    margin: 0;
    padding: 0;
    margin-bottom: 12px;
`
const CommentsContainer = styled.div`
    margin: 0 8px;
`


export default function Comments(props){
    console.log(props)
    const comments = props.comments.map((comment, ind) => <Comment 
                                                                    color={comment.color} 
                                                                    key={ind} 
                                                                    comment={comment.value} 
                                                                    index={ind}
                                                                    range={comment.range}
                                                                    handleDelete={props.handleDeleteComment}
                                                                    handleRangeClick={props.handleCommentClick}/>)
    return (
        <Fragment>
            <H3>Comments</H3>
            <CommentsContainer>{comments}</CommentsContainer>
        </Fragment> 
    )
}