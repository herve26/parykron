import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
    border: 1px solid red;
    margin-bottom: ${props => props.margin ? '16px' : ''};
    background-color: white;
    border: none;
    color: ${props => props.active ? '#1100FC' : '#707070'};
    cursor: pointer;
`
export default function Button(props){
    return (
        <ButtonWrapper margin={props.margin} onClick={props.handleClick ? props.handleClick(props.index) : () => {}} active={props.active}>
            {props.children}
        </ButtonWrapper>
    )
}