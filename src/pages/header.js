import React from "react";
import styled from "styled-components";

import WindowsNav from "../components/windows-nav";

const HeaderWrapper = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 4px #00000029;

`

const H1 = styled.h1`
    margin: 0;
    margin-right: auto;
    padding: 6px 0;
`
export default function Header(props){
    return(
        <HeaderWrapper>
            {props.children}
            <H1>Epub</H1>
            <WindowsNav/>
        </HeaderWrapper>
    )
}