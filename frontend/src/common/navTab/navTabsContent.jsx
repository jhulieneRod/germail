import React from 'react'

const NavTabsContent = props => (
    <div {...props} className='tab-content pb-2'>
        {props.children}
    </div>
)

export default NavTabsContent;