import React from 'react';
import styled from 'styled-components'


const SidebarWrapper = styled.aside`
    width: ${props => props.isClose ? 0 : props.wide}px;
    transition: width, padding 0.5s ease;
    border-right: 1px solid #707070;
    padding: ${props => props.isClose ? 0 : 16}px;
    overflow-y: auto;
    overflow-x: hidden;
`

export default function SideBar(props){
    return (
        <SidebarWrapper className="scrollbar" isClose={props.isSectionClose} wide={props.width}>
            {props.children}
        </SidebarWrapper>
    )
}