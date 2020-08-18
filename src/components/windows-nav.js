import React from "react";
import styled from 'styled-components';

import { minimizeWindow, closeWindow, maximazeWindow } from '../utils/window';

const buttonStyle = `
    color: #707070;
    background-color: white;
    height: 32px;
    width: 46px;
    border: none;
    outline: 0;
    -webkit-app-region: no-drag;
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

const MaximazeButton = styled.button`
    ${buttonStyle}
`

export default function WindowsNav(props){
    return(
        <div>
            <MinimizeButton onClick={()=> minimizeWindow()}>-</MinimizeButton>
            <MaximazeButton onClick={()=> maximazeWindow()}>d</MaximazeButton>
            <CloseButton onClick={()=> closeWindow()}>X</CloseButton>
        </div>
    )
}