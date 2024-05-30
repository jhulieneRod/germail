import React from 'react'

const tabsHeader = props => (
    // <ul {...props} className='nav nav-tabs'> 
    <div className='card-header p-0 border-bottom-0' style={{position:'static'}}>
        <ul {...props} className='nav nav-tabs' role='tablist'>
            {props.children}
        </ul>
    </div>
)

export default tabsHeader;