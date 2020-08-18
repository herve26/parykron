import React, { Fragment, useState } from 'react'
import styled from 'styled-components';

const H3 = styled.h3`
    margin: 0;
    padding: 0;
`

const Label = styled.label`
    display: block;
    margin: 12px 0;
    padding: 6px 4px;
`

const Input = styled.input`
    width: 100%;
    margin-top: 4px;
`

const Select = styled.select`
    width: 100%;
    margin-top: 4px;
`

export default function Settings(props) {

    
    const fontElements = props.fonts.map((font, index) => <option value={index} key={index}>{font}</option>)
    const pageFlowSelect = props.flowTypes.map((pf, index) => <option value={index} key={index}>{pf.charAt(0).toUpperCase() + pf.slice(1)}</option>)

    return (
        <Fragment>
            <H3>Settings</H3>
            <div>
                <Label>Font
                    <Select 
                        value={props.fonts.indexOf(props.font)} 
                        onChange={(e) => {props.handleFontChanged(e.target.value)}
                    }>
                        { fontElements }
                    </Select>
                </Label>
                <Label>Font Size
                    <Input  min="0" 
                            max="200" 
                            value={props.fontSize} 
                            onChange={e => {props.handleFontSizeChanged(e.target.value)}} 
                            type="number"
                    />
                </Label>
                <Label>Line Height
                    <Input  min="0"
                            max="10"
                            step="0.1"
                            value={props.lineHeight}
                            onChange={e => {props.handleLineHeightChanged(e.target.value)}}
                            type="number"
                    />
                </Label>
                <Label>Paragraph margin
                    <Input  min="0"
                            max="10"
                            step="0.1"
                            value={props.pMargin}
                            onChange={e => {props.handlePMarginChanged(e.target.value)}}
                            type="number"
                    />
                </Label>
                <Label>Page Flow
                    <Select
                        value={props.flow}
                        onChange={e => props.handlePageFlowChanged(e.target.value)}
                        >{pageFlowSelect}</Select>
                </Label>
            </div>
        </Fragment>
    )
}