import React from 'react'
import If from '../operator/if';

const menuTree = props => (
    <li className='nav-item'>
        <a href='#' className='nav-link'>
            {/* <a href='#' className='nav-link' style={{padding:'.4rem .4rem'}}> */}
            <If condicao={props.icon}>
                <i className={`nav-icon fa fa-${props.icon}`}></i>
            </If>
            <p>
                {props.label}
                <i className='fa fa-angle-left right'></i>
            </p>
        </a>
        <ul className='nav nav-treeview'
            style={{
                display: 'none',
                backgroundColor: '#fff'
                // position: 'relative',
            }}
        >
            {props.children}
        </ul>
    </li>
)

export default menuTree 