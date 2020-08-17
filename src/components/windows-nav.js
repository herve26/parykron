import React from "react";
import styled from 'styled-components';

const CloseButton = styled.button`
    border: 1px solid red;
    color: #707070;
    background-color: white;
    height: 48px;
    width: 48px;
    border: none;
    /* transition: background-color, color 0.2s ease; */
    &:hover{
        background: #F44336;
        color: white;
    }
`

const MinimizeButton = styled.button`
    border: 1px solid red;
    color: #707070;
    background-color: white;
    height: 48px;
    width: 48px;
    border: none;
    &:hover{
        background-color: #0000001a;
        color: white; 
    }
`

export default function WindowsNav(){
    return(
        <div>
            <MinimizeButton>-</MinimizeButton>
            <CloseButton>X</CloseButton>
        </div>
    )
}