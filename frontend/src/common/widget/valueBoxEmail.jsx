import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '../layout/grid';
import ButtonLink from '../form/buttonLink';
import LogDestinatarioEmailList from '../../logDestinatarioEmail/logDestinatarioEmailList';

const ValueBoxEmail = props => {

    const [show, setShow] = useState(false); 

    return (
        <>
            <LogDestinatarioEmailList
                title={props.title}
                show={show}
                onHide={() => setShow(false)} 
                tipo={props.tipo ?? 0}
            />
            <Grid cols={props.cols}>
                <div className="small-box" 
                    style={
                        {
                            backgroundColor: props.color,
                            color: '#fff'
                        }
                    }>
                    <div className="inner">
                        <h3>{props.valor}</h3>
                        <p>{props.title}</p>
                    </div>
                    <div className="icon">
                        <i className={`fas fa-${props.icon}`}></i>
                    </div>
                    <a href="#" 
                        className="small-box-footer" 
                        onClick={() => {
                            // props.getWidgetsPesquisar({ tipo: props.tipo });
                            setShow(true)
                        }}>
                        Visualizar <i className="fas fa-arrow-circle-right"></i>
                    </a>
                </div>
            </Grid>
        </>
    )
}

export default ValueBoxEmail