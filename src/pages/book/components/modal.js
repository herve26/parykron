import React, { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

const colors = {secondary: '#1100FC', text: '#707070', secondary_text: '#fafafa'}
const shadow = {raised: `0 1px 2px rgba(0,0,0,0.1), 
                            0 2px 4px rgba(0,0,0,0.1), 
                            0 4px 8px rgba(0,0,0,0.1), 
                            0 8px 16px rgba(0,0,0,0.1),
                            0 16px 32px rgba(0,0,0,0.1), 
                            0 32px 64px rgba(0,0,0,0.1);`}


const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    background: white;
    width: 300px;
    height: 340px;
    transform: translateY(-50%);
    padding: 16px;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.7);
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.7);
    overflow: hidden;
    display: flex;
    flex-direction: column;
`

const ModalTitle = styled.h3`
    text-align: center;
    padding: 0;
    margin: 0;
    margin-bottom: 12px;
    color: ${colors.text};
    font-size: 24px;
`

const ColorContainer = styled.div`
    display: flex;
    margin: 12px 0;
    padding: 6px;
    border: 1px solid ${colors.secondary};
`

const TypeContainer = styled.div`
    border: 1px solid red;
    padding: 6px;
    border: 1px solid ${colors.secondary};
`

const TypeButton = styled.button`
    width: 30px;
    height: 30px;
    margin: 0 6px;
    border: none;
    border-bottom: 3px solid ${props => props.activeType ? colors.secondary : colors.text};
    background-color: ${colors.text};
    color: ${colors.secondary_text};
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    &:first-child{
        margin-left: 0;
    }
    &:hover{
        border-bottom: 3px solid ${colors.secondary};
    }
`

const ColorBox = styled.button`
    background-color: ${props => props.color};
    border: none;
    border-bottom: 3px solid ${props => props.active ? colors.secondary : props.color};
    height: 24px;
    width: 24px;
    margin: 0 6px;
    cursor: pointer;
    &:hover{
        border-bottom: 3px solid ${colors.secondary};
    }
    &:first-child{
        margin-left: 0;
    }
`
const CloseButton = styled.button`
    border: 1px solid red;
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    height: 24px;
    width: 24px;
    cursor: pointer;
    background-color: ${'#e53935'};
    color: ${colors.secondary_text};
    display: flex;
    justify-content: center;
    align-items: center;
`
const Textarea = styled.textarea`
    width: 100%;
    resize: none;
    border: 1px solid ${colors.secondary};
    margin-bottom: 12px;
    height: 136px;
`

const SubmitButton = styled.button`
    border: none;
    padding: 6px 8px;
    text-transform: uppercase;
    cursor: pointer;
    background-color: ${colors.secondary};
    color: ${colors.secondary_text};
    &:hover{
        box-shadow: ${shadow.raised};
    }
`

const CommentType = (props) => <TypeButton activeType={props.activeType} onClick={() => props.clicked(props.index)}>{props.label}</TypeButton>

export default function Modal(props){
    const [comment, setComment] = useState('')
    const [activeColor, setActiveColor] = useState(0)

    const handleCommentChange = e => {
        setComment(e.target.value)
    }

    const handleColorClick = v => e => {
        setActiveColor(v)
    }
    const colorBox = props.colors.map((color, index) => 
        <ColorBox color={color} key={index} active={index === activeColor ? true : false} onClick={handleColorClick(index)}/>
    )

    const annotationTypeMap = props.annotationTypes.map((ann, index) => <CommentType 
                                    activeType={props.currentAnnotationType.name === ann.name ? true : false} 
                                    key={index} 
                                    name={ann.name}
                                    index={index}
                                    label={ann.label} 
                                    clicked={props.handleAnnType}/>)

    return(
        <ModalContainer>
            <CloseButton onClick={props.handleOpen(false)}><CloseIcon/></CloseButton>
            <ModalTitle>{props.title}</ModalTitle>
            <TypeContainer>{annotationTypeMap}</TypeContainer>
            <ColorContainer>{colorBox}</ColorContainer>
            <Textarea onChange={handleCommentChange} value={comment}></Textarea>
            <SubmitButton onClick={props.handleAddComment({comment, color: props.colors[activeColor]})}>Comment</SubmitButton>
        </ModalContainer>
    )
}