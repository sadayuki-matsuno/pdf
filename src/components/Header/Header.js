import React from 'react'
import { IndexLink } from 'react-router'
import Image from './logo.png'
import './Header.scss'

export const Header = () => (
   <div className='container text-center'>
     <div className='row'>
       <div className='col-xs-2 col-xs-offset-5'>
         <IndexLink to='/' >
           <img className='logo'
             src={Image}
             alt='This is the logo.'
           />
         </IndexLink>
       </div>
     </div>
     <h1>Welcome to Matsuno PDF Viewer</h1>
   </div>
)

export default Header
