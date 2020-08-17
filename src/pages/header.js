import React from "react";
import styled from "styled-components";

import AddIcon from '@material-ui/icons/Add';

import WindowsNav from "../components/windows-nav";

const HeaderWrapper = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 4px #00000029;
`
const H1 = styled.h1`
    margin: 0;
    margin-left: 48px;
    padding: 6px 0;
`
const AddButton = styled.button`
    border: 1px solid red;
    margin-left: 12px;
    margin-top: 0;
    margin-right: auto;
    border: 1px solid #707070;
    background-color: white;
    color: #707070;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    /* border-radius: 50%; */
    cursor: pointer;
`

export default function Header(props){
    return(
        <HeaderWrapper>
            {props.children}
            <H1>ParyKron</H1>
            <AddButton onClick={() => props.handleAddBook()}><AddIcon/></AddButton>
            <WindowsNav/>
        </HeaderWrapper>
    )
}