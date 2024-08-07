import React from 'react'

const contentHeader = props => (
    <section className='content-header content_header'>
        <h1>{props.title} <small>{props.small}</small></h1>
    </section>
);

export default contentHeader;