import React from 'react'

const NavTabsHeader = props => (

    <ul {...props} className='nav nav-tabs' id='myTab' role='tablist'>
        {props.children}
    </ul >

)

export default NavTabsHeader;