import React, { Component, forwardRef, PureComponent } from 'react';
import { EpubView } from 'react-reader';
import styled from 'styled-components';
import Loader from 'react-loader-spinner'
import _ from 'lodash';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Button from '../../../components/button';
import { getBasename } from '../../../utils/book';
import Range from '../../../utils/range';



const ReaderContainer = styled.div`
    flex-grow: 1;
    position: relative;
    overflow: hidden;
`

const BookReaderWrapper = styled.div`
    padding: 16px;
    width: 100%;
    height: 100%;
`

const ChevronWrapper = styled.div`
    position: absolute;
    top: 4px;
    bottom: 0;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
`

const LoaderWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export default class BookReader extends Component {
    constructor(props) {
        super(props);

        this.readerRef = React.createRef();
        this.rendition = ''
        this.state = {cfi: '', rendition: '', first_load: false, }
        this.prevComments = []
        this.spinner = "TailSpin"
        this.counter = 0
        this.timer = {timer: null, timed: false}
        this.pageFlow = this.props.pageFlow
    }

    handleClick = v => e => {

        if (v === 'left') {
            const node = this.readerRef.current;
            node.prevPage();
        }
        else if (v === 'right') {
            const node = this.readerRef.current;
            node.nextPage();
        }

        this.removeAnnotations()
        this.AddAnnotations()
    };

    getRendition = rendition => {

        this.setState({rendition: rendition})

        rendition.on('selected', (cfiRange, content) => {
            this.props.handleModalOpen(true)(cfiRange)
        })

        rendition.on('rendered', (section, view) => {
            this.addStyleSheets()
        })

    }

    addStyleSheets = () => {
            this.state.rendition.themes.register('./style/font-style.css')
    }

    populateComments = () => {
        if(this.state.rendition){
            this.props.comments.map((comment,ind) => {
                this.removeAnnotation(comment.range, comment.type || 'highlight')
            })

            this.props.comments.map((comment, ind) => {
                this.AddAnnotation(comment.range, comment.type || 'highlight', {comment: comment.value}, comment.color);
            })

            this.prevComments = this.props.comments
        }
    }

    AddAnnotations = () => {
        if(this.state.rendition){
            if(this.timer.timer) clearTimeout(this.timer.timer)
            this.timer.timer = setTimeout(() => {
                    this.props.comments.map((comment, ind) => {
                        this.AddAnnotation(comment.range, comment.type || 'highlight', {comment: comment.value}, comment.color)
                    })
            },1000)
        }
    }

    removeAnnotations = () => {
        if(this.state.rendition){
            this.props.comments.map((comment,ind) => {
                this.removeAnnotation(comment.range, comment.type || 'highlight')
            })
        }
    }

    AddAnnotation = (range, type, data, color) => {
        const annType = {};
        if(type === 'highlight') 
            annType.fill = color;
        else if(type === 'underline')
            annType.stroke = color;

        this.state.rendition.annotations.add(type, range, data, '', `epub-${type}`, annType)
    }
    
    removeAnnotation = (range, type) => {
        try {
            this.state.rendition.annotations.remove(range, type);
        } catch (error) {
            // console.log(error)
        }   
    }

    handleLocationChanged = (cfi) => {
        this.props.handleLocationChanged(cfi)
    }

    goto = (url) => {
        if(this.state.rendition)
            this.state.rendition.display(url)
    }

    changeFontSize = (perc) => {
        this.setState({fontSize: perc}, () => {
            this.injectStyle()
        })
    }
    injectStyle = () => {
        if(this.state.rendition){
            this.state.rendition.themes.fontSize(`${this.props.renderData.fontSize}%`)
            if(this.props.renderData.lineHeight !== '0')
                this.state.rendition.themes.override('line-height', `${this.props.renderData.lineHeight}em`)
        }
    }

    changeFont = () => {        
        this.injectFontClass()
    }

    injectFontClass = () => {
        if(this.state.rendition){
            this.state.rendition.themes.font(`${this.props.renderData.font}`)
        }
    }

    changeLineHeight = () => {
        this.injectStyle()
    }

    changePMargin = () => {
        this.injectStyle()
    }

    changePageFlow = () => {
        if(this.state.rendition){
            console.log(this.props.pageFlow, this.pageFlow)
            if(this.state.pageFlow !== this.props.pageFlow){

                this.state.rendition.flow(this.props.pageFlow)
                this.pageFlow = this.props.pageFlow
            }
        }
    }

    renditionResize = () => {
        if(this.state.rendition){
            if(this.timer.resize) clearTimeout(this.timer.resize)
            this.timer.resize = setTimeout(() => {
                const {width, height } = this.readerRef.current.viewerRef.current.getBoundingClientRect()
                this.state.rendition.resize(width, height)
            }, 800)
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        const { comments, pageFlow, renderData } = this.props
        const { font, lineHeight, fontSize } = renderData
        const { comments: nextComments, pageFlow: nextPageFlow, renderData: nextRenderData } = nextProps
        const { font: nextFont, lineHeight: nextLineH, fontSize: nextFontSize } = nextRenderData
        let shouldUpdate = false

        if(!_.isEqual(comments, nextComments)) shouldUpdate = true
        if(!_.isEqual(pageFlow, nextPageFlow)) shouldUpdate = true
        if(!_.isEqual(font, nextFont)) shouldUpdate = true
        if(!_.isEqual(lineHeight, nextLineH)) shouldUpdate = true
        if(!_.isEqual(fontSize, nextFontSize)) shouldUpdate = true
        
        return shouldUpdate;
    }

    componentDidUpdate(){
        if(this.state.rendition){
            this.injectStyle()
            this.injectFontClass()
            this.removeAnnotations()
            this.AddAnnotations()
            this.changePageFlow()
            
        }
    }

    render(){
        return (
            <ReaderContainer wide={this.props.width}>
                <ChevronWrapper style={{ left: 0 }} onClick={this.handleClick('left')}>
                    <Button className="epub-chevron" index={'left'}>
                        <ChevronLeftIcon/>
                    </Button>
                </ChevronWrapper>
                <BookReaderWrapper>
                    {<EpubView
                        ref={this.readerRef}
                        url={`http://localhost:${window.serverPort}/book/${getBasename(this.props.path)}`}
                        locationChanged={this.handleLocationChanged} 
                        getRendition={this.getRendition}
                        epubOptions={{
                            manager: "default",
                            // flow: this.props.pageFlow
                          }}
                        tocChanged={this.props.loadToc}
                        location={this.props.location}
                        loadingView={
                        <LoaderWrapper>
                        <Loader
                            type={this.spinner}
                            color="#1100FC"
                            height={100}
                            width={100}
                        />
                        </LoaderWrapper>}
                    />}
                </BookReaderWrapper>
                <ChevronWrapper onClick={this.handleClick('right')} style={{ right: 0 }}>
                    <Button >
                        <ChevronRightIcon/>
                    </Button>
                </ChevronWrapper>
            </ReaderContainer>
        );
    }
}
