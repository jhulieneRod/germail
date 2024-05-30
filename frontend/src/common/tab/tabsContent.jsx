import React from 'react'

const tabsContent = props => (
    <div className='card-body p-0'>
        <div {...props} className='tab-content tab_content'>
            {props.children}
        </div>
    </div>
)

export default tabsContent;