import React from 'react';
import Menu from './menu';
import logo from '../image/Logo Nova Azul Horizontal.png';
import logoW from '../image/Logo Nova Branca Horizontal.png';
import icon from '../image/Fiveicon.png';

const sideBar = props => (
    <aside className="main-sidebar elevation-4 sidebar-light-lightblue">
        {/* <aside className="main-sidebar sidebar-dark-primary elevation-2"></aside> */}
        <a href='#' className='brand-link p-0 pt-1 pb-1 text-center'>
            <span className='logo-xs' style={{ width: 'auto', paddingTop:'5px'}} >
                <img src={icon} height="35" alt="" style={{paddingLeft: '20px'}} />
            </span>
            <span className='brand-text font-weight-light'>
                <img src={logo} height="45" alt="" />
            </span>
        </a>
        <div className='sidebar'>
            <Menu addTabs={props.addTabs} />
        </div>
    </aside>
)

export default sideBar;