import React, { Component } from 'react'

export default class Grid extends Component {

    toCssClasses(numbers) {
        const cols = numbers ? numbers.split(' ') : []
        let classes = ''

        if (cols[0]) classes += ` col-${cols[0]}`
        if (cols[1]) classes += ` col-sm-${cols[1]}`
        if (cols[2]) classes += ` col-md-${cols[2]}`
        if (cols[3]) classes += ` col-lg-${cols[3]}`
        if (cols[4]) classes += ` col-xl-${cols[4]}`

        return classes
    }

    render() {
        let gridClasses = this.toCssClasses(this.props.cols || '12');
        let gridStyle = (this.props.style) ? this.props.style : {};

        gridClasses += (this.props.className) ? ' ' + this.props.className : '';

        // if (!this.props.wCol)
        //     gridClasses += (this.props.className) ? ' ' + this.props.className : '';
        // else {            
        //     gridClasses = (this.props.className) ? ' ' + this.props.className : 'col';
        //     gridStyle.width = `${this.props.wCol}px`;
        // }

        return (
            <div className={`${gridClasses}`} style={gridStyle}>
                {this.props.children}
            </div>
        )
    }
}