import React from 'react'
import { Link } from 'react-router'

export class Footer extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <hr />
        <Link to='/404'>Go to 404 Page</Link>
      </div>
    )
  }
}

export default Footer
