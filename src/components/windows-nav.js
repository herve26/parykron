import React from "react";
import styled from 'styled-components';

import { } from '../utils/book';

const buttonStyle = `
    color: #707070;
    background-color: white;
    height: 32px;
    width: 46px;
    border: none;
    outline: 0;
    &:hover{
        background-color: #0000001a;
    }
    &:active{
        outline: 0;
    }
`

const CloseButton = styled.button`
    ${buttonStyle}
    &:hover{
        background: #F44336;
        color: white;
    }
`

const MinimizeButton = styled.button`
    ${buttonStyle}
    
`

const RestoreButton = styled.button`
    ${buttonStyle}
`

export default function WindowsNav(props){
    const handleClick = (action) => {
        console.log(action)
    }
    return(
        <div>
            <MinimizeButton onClick={()=> handleClick('minimize')}>-</MinimizeButton>
            <RestoreButton onClick={()=> handleClick('restore')}>d</RestoreButton>
            <CloseButton onClick={()=> handleClick('close')}>X</CloseButton>
        </div>
    )
}