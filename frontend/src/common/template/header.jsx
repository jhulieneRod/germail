import React from 'react';
import Navbar from './navbar';

const header = props => (
    // <nav className='main-header navbar navbar-expand navbar-white navbar-light' style={{padding: '4px 8px 2px 8px'}}>
    <nav className='main-header navbar navbar-expand navbar-light text-sm'>
        <ul className='navbar-nav'>
            <li className='nav-item'>
                <a className='nav-link' data-widget='pushmenu' href='#' role='button'><i className='fas fa-bars'></i></a>
                {/* <button className='button_link p-0' data-widget='pushmenu' href='#' role='button' style={{color:'#343a40'}}><i className='fas fa-bars'></i></button>                 */}
            </li>
        </ul>
        <Navbar />
    </nav>
)

export default header;