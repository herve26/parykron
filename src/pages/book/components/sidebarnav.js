import React from 'react';
import styled from 'styled-components'

import Button from '../../../components/button';

const SidebarWrapper = styled.aside`
    min-width: 48px;
    border-right: 1px solid #707070;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-top: 16px;
    overflow-x: hidden;
`

export default function SideBarNav(props){

    const sectionsMap = props.sections.map((value, index) => <Button key={index} index={index} margin={true} handleClick={props.handleSectionClick} 
                                            active={index === props.currentSection ? true : false}>{value.image}</Button> )
    return (
        <SidebarWrapper>
            {sectionsMap}
        </SidebarWrapper>
    )
}