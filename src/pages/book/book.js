import React, { Fragment, useState } from 'react';
import styled from 'styled-components'; 
import Epubcfi from 'epubjs/lib/epubcfi'

import CommentIcon from '@material-ui/icons/Comment';
import SettingsIcon from '@material-ui/icons/Settings';
import TocIcon from '@material-ui/icons/Toc';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import HighlightIcon from '@material-ui/icons/Highlight';

import SideBarNav from './components/sidebarnav'
import SideBar from './components/sidebar';

import Comments from './sections/comments';
import Settings from './sections/settings';
import Toc from './sections/toc';

import BookReader from './components/bookReader';
import Modal from './components/modal';

import { useWindowSize } from '../../utils/hooks';
import Range, {isOverlapping} from '../../utils/range';
import { useCommentStore, bookUpdate } from '../../utils/store';
import { useBuildFonts } from '../../utils/font';


// TODO: There is too much going on in this component it needs to be split
// TODO: Change it into a class component


const Container = styled.div`
    /* border: 1px solid red; */
    display: flex;
    height: 90vh;
`
const AsideContainer = styled.div`
    /* width: 25%; */
    display: flex;
    height: 100%;
    /* border: 2px solid yellow; */
`


export default function Book(props){
    // console.log(props)
    const highlightColors = ['#F4A93A', '#F64BAB', '#1CA7E0', '#E1EA4E', '#F8D336']
    const fontFamilies = ['Default', 'Roboto', 'Open Sans']
    const annotationTypes = [{name: 'highlight', label: <HighlightIcon/>}, {name: 'underline', label: <FormatUnderlinedIcon/>}]
    const pageFlowTypes = ['scrolled', 'paginated']
    const sections = [
        {name: 'Table of Contents', image: <TocIcon/>},
        {name:'comments', image:<CommentIcon/>}, 
        {name:'Settings', image:<SettingsIcon/>}
    ]
    const isEmpty = (obj) => {
        const em = Object.keys(obj).length;
        if(em > 0)
            return false
        return true
    }

    const [ comments, {setNewComment, setOldComment}] = useCommentStore(isEmpty(props.book) ? '' : props.book.doc.hash)
    const [ currentAnnotationType, setcurrentAnnotationType ] = useState(annotationTypes[0])
    const [ toc, setToc ] = useState([])
    const readerRef = React.createRef()
    const [ font, setFont ] = useState(props.book.doc.font || fontFamilies[0])
    const [ fontSize, setFontSize ] = useState(props.book.doc.font_size || '100')
    const [ lineHeight, setLineHeight ] = useState(props.book.doc.line_height || '0')
    const [ pMargin, setPMargin ] = useState(props.book.doc.paragraph_margin || '0')
    const [ pageFlow, setPageFlow ] = useState(props.book.doc.page_flow ? pageFlowTypes.indexOf(props.book.doc.page_flow) : 0)
    const [activeSection, setActiveSection] = useState(2)
    const [modalOpen, setModalOpen] = useState(false)
    const [cfiRange, setCfiRange] = useState('')
    const [ isSectionClose, setSectionClose ] = useState(false)
    const handleSectionChange = v => e => {
        if(v === activeSection && !isSectionClose){
            console.log(sections[v].name)
            setSectionClose(true)
            readerRef.current.renditionResize()
        }
        else{
            if(isSectionClose){
                console.log('it is resizing')
                readerRef.current.renditionResize()
            }
            setSectionClose(false)
            setActiveSection(v)

        }
        
    }

    // console.log(props.book, pageFlow)
    // console.log(annotationTypes.indexOf(props.book.doc.page_flow), props.book.doc.page_flow)

    const handleModalOpen = v => e => {

        setModalOpen(v)
        if(v){
            setCfiRange(e)
        }
        else{
            setCfiRange('')
        }
    }
    
    const handleAddComment = ({comment, color}) => e => {
            const newComment = {color: color, value: comment.trim(), type: currentAnnotationType.name, range: cfiRange, rangeObj: new Range(cfiRange)}
            setNewComment(newComment)
            setModalOpen(false)
    }

    const handleDeleteComment = index => e => {
        setOldComment(comments[index])
    }
    
    const handleCommentClick = range => {
        console.log(range)
        readerRef.current.goto(range)
    }

    const handleAnnotationTypeChange = t => {
        console.log(t)
        setcurrentAnnotationType(annotationTypes[t])
    }

    const handleLocationChange = v => {
        bookUpdate.range(props.book, v)
    }

    const loadToc = t => {
        setToc(t)
    }

    const handleTocClicked = url => {
        readerRef.current.goto(url)
    }

    const handleFontSizeChanged = size => {
        bookUpdate.fontSize(props.book, size)
        setFontSize(size)
    }

    const handleFontChanged = f => {
        bookUpdate.font(props.book, fontFamilies[f])
        setFont(fontFamilies[f])
    }

    const handleLineHeightChanged = lh => {
        bookUpdate.lineHeight(props.book, lh)
        setLineHeight(lh)
    }

    const handlePMarginChanged = pm => {
        bookUpdate.pMargin(props.book, pm)
        setPMargin(pm)
    }

    const handlePageFlowChanged = f => {
        bookUpdate.pageFlow(props.book, pageFlowTypes[f])
        setPageFlow(f)
        // readerRef.current.changePageFlow(pageFlowTypes[f])
    }
    const sidebarWidth = 289;
    const sidebarNavWidth = 48;

    return(
        <Fragment>
            <Container>
                <AsideContainer>
                    <SideBarNav width={sidebarNavWidth} sections={sections} currentSection={activeSection} handleSectionClick={handleSectionChange}/>
                    <SideBar isSectionClose={isSectionClose} width={sidebarWidth}>
                            {[<Toc value={toc} handleTocClicked={handleTocClicked} />,
                            <Comments comments={comments} handleCommentClick={handleCommentClick} handleDeleteComment={handleDeleteComment}/>, 
                            <Settings 
                                handleFontSizeChanged={handleFontSizeChanged} 
                                handleFontChanged={handleFontChanged}
                                handleLineHeightChanged={handleLineHeightChanged}
                                handlePMarginChanged={handlePMarginChanged}
                                handlePageFlowChanged={handlePageFlowChanged}
                                fontSize={fontSize}
                                lineHeight={lineHeight}
                                pMargin={pMargin}
                                fonts={fontFamilies}
                                font={font}
                                flow={pageFlow}
                                flowTypes={pageFlowTypes}
                            />][activeSection]}
                    </SideBar>
                </AsideContainer>
                <BookReader 
                    path={isEmpty(props.book) ? '' : props.book.doc.bookPath} 
                    comments={comments} 
                    handleModalOpen={handleModalOpen} 
                    width={useWindowSize().width - (sidebarWidth + sidebarNavWidth) }
                    handleLocationChanged={handleLocationChange}
                    location={isEmpty(props.book) ? '' : props.book.doc.range ? props.book.doc.range : 0}
                    loadToc={loadToc}
                    ref={readerRef}
                    families={fontFamilies}
                    renderData={{
                        font: font, 
                        fontSize: fontSize,
                        lineHeight: lineHeight,
                        pMargin: pMargin}}
                    pageFlow={pageFlowTypes[pageFlow]}
                />
            </Container>
            {modalOpen && 
            <Modal 
                currentAnnotationType={currentAnnotationType}
                annotationTypes={annotationTypes}
                handleAnnType={handleAnnotationTypeChange} 
                colors={highlightColors} 
                title="Comments" 
                handleAddComment={handleAddComment} 
                handleOpen={handleModalOpen}/>}
        </Fragment>
    )
}
