// import React, { useState } from 'react';

export default function Tabs(props) {

    // const [tabSelectList, setTabSelectList] = useState([]);

    return (
        // <div className='nav-tabs-custom'>
        <div className='card card-primary card-outline card-outline-tabs mb-1' style={{}}>
            {props.children}
        </div>)
}
