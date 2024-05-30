import React from 'react'
import Grid from '../layout/grid'

const valueBox2 = props => {
    return (
        <Grid cols={props.cols}>
            <div className="card" style={{ borderLeft: `3px solid ${props.color ? props.color : '#FFFFFF'}` }}>
                <div className="card-body pb-1">
                    <div className="row">
                        <div className="col mt-0">
                            <h5 style={{ color: '#3e4676', fontSize: '18px', lineHeight: '1.5' }}>{props.title}</h5>
                        </div>
                        <div className="col-auto">
                            <div className="box_icon" style={{ backgroundColor: `${props.color ? props.color : '#FFFFFF'}` }}>
                                <i className={`fa fa-${props.icon}`}></i>
                            </div>
                        </div>
                    </div>
                    <h2 className="mt-0 mb-0" style={{ color: `#3e4676` }}>{props.value}</h2>
                    <div className="mb-0 float-right">
                        <button
                            label="Ver Detalhes"
                            iconright="arrow-circle-right"
                            type="button"
                            className="button_link_a "
                            onClick={props.onClick}
                        >
                            <i className="fa fa-undefined"></i> <span>Ver Detalhes</span> <i className="fa fa-arrow-circle-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </Grid>
    )
}

export default valueBox2;