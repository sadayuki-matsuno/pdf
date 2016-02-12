import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './Preview.scss'
import path from 'path'
import { PDFJS, PDFViewerApplication } from 'pdfjs-dist'

function mapStateToProps (state) {
  

  return {  page: 1, scale: 10}
}

export class View extends React.Component {
  static propTypes = {
  };

//  var Pdf = React.createClass({
//    displayName: 'React-PDF',
//    propTypes: {
//      file: React.PropTypes.string,
//      content: React.PropTypes.string,
//      page: React.PropTypes.number,
//      scale: React.PropTypes.number,
//      onDocumentComplete: React.PropTypes.func,
//      onPageComplete: React.PropTypes.func
//    },
//    getInitialState: function() {
//      return { }
//   , },
//    getDefaultProps: function() {
//      return 
//    }
  _loadPDFDocument (byteArray) {
    PDFJS.getDocument(byteArray).then(this._onDocumentComplete)
  }

  componentDidMount() {
      let fileContent = this.props.fileContent
      let scale = 1.0
      PDFJS.getDocument({ data : fileContent.body}).then(function (data) { data.getPage(1).then(function (page) {console.dir(page.getViewport(1))
        setTimeout(() => {
          var canvas = document.getElementById("game");
          let context = canvas.getContext('2d')
          let viewport = page.getViewport(scale)
          canvas.height = viewport.height
          canvas.width = viewport.width
          let renderContext = {
            canvasContext: context,
            viewport: viewport
          }
          page.render(renderContext)
        })
      })})
}
    

  componentWillReceiveProps (newProps) {
    if (newProps.fileContent && newProps.fileContent !== this.props.fileContent) {
      this._loadPDFDocument(newProps.fileContent)
    }
    if (!!this.props.pdf && !!newProps.page && newProps.page !== this.props.page) {
      this.setState({page: null})
      this.state.pdf.getPage(newProps.page).then(this._onPageComplete)
    }
  }
  

  render () {
    const { scale, page, loading, fileContent } = this.props
        return (<canvas id={'game'} ref={'pdf'}></canvas>)
  }

  _onDocumentComplete (pdf){
//    if (!this.isMounted()) return
//    this.setState({ pdf: pdf })
//    if(!!this.props.onDocumentComplete && typeof this.props.onDocumentComplete === 'function'){
//      this.props.onDocumentComplete(pdf.numPages)
//    }
//    pdf.getPage(this.props.page).then(this._onPageComplete)
  }

  _onPageComplete (page){
//    if (!this.isMounted()) return
//    this.setState({ page: page })
//    if(!!this.props.onPageComplete && typeof this.props.onPageComplete === 'function'){
//      this.props.onPageComplete(page.pageIndex + 1)
//    }
  }

}

export default connect(mapStateToProps)(View)
