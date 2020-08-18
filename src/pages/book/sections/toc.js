import React, { Fragment } from 'react'
import styled from 'styled-components'

const H2 = styled.h2`
    margin: 0;
    padding: 0;
`

const Ul = styled.ul`
    list-style: none;
    padding: 0;
`

const Li = styled.li`
    margin: 12px 0;
    border: 1px solid #e0e0e0;
    padding: 6px 4px;
    cursor: pointer;
    font-weight: ${props => props.level === 0 ? 'bold' : 'normal'};
    font-style: ${props => props.level === 2 ? 'italic' : 'normal'};
    &:hover{
        background-color: #e0e0e054;
    }
`

export default function Toc(props){

    const tocArrToElm = (arr, newArr, level) => {
        for (let i = 0; i < arr.length; i++) {
            newArr.push(<Li onClick={()=> props.handleTocClicked(arr[i].href)} level={level} key={arr[i].id}>{arr[i].label}</Li>)
            if(arr[i].subitems.length){
                tocArrToElm(arr[i].subitems, newArr, level + 1) 
            }
        }
    }
    
    const toc = []
    
    if(props.value.length){
        tocArrToElm(props.value, toc, 0)
    }

    return(
        <Fragment>
            <H2>Table of Content</H2>
            <Ul>
                {toc}
            </Ul>
        </Fragment>
    )
}