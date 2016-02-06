import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const mapStateToProps = (state) => ({
  dummy: state.bookshelfPath
})

export class Footer extends React.Component {
  render () {
  const { lastUpdated } = this.props
    return (
      <div className='container text-center'>
        <hr />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </p>
        <Link to='/404'>Go to 404 Page</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Footer)
