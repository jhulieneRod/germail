import React, { Component } from 'react';

class Content extends Component{
    render(){
        return (
            <section className={`content content_ ${(this.props.className) ? this.props.className : ''}`}>{this.props.children}</section>
        )    
    }
}

export default Content;