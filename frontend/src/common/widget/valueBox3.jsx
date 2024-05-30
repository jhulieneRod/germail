import React from 'react'
import Grid from '../layout/grid'

const valueBox3 = props => {
    return (
        <Grid cols={props.cols}>
            <div className="info-box">
                <div className="info-box-content">
                    <span className="info-box-text">Messages</span>
                    <span className="info-box-number">1,410</span>
                </div>
                <span className="info-box-icon bg-info"><i className="far fa-envelope"></i></span>
            </div>
        </Grid>
    )
}

export default valueBox3;