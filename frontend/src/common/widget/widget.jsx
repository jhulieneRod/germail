import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ButtonLink from '../form/buttonLink';
import { Card, CardBody } from '../layout/card';
import { getWidgetsPesquisar } from '../../dashboard/dashboardActions';
import DashboardWidgetsList from '../../dashboard/dashboardWidgetList';
import Grid from '../layout/grid'
import { set } from 'date-fns';

const Widget = props => {

    const [show, setShow] = useState(false);    

    const data = {
        labels: (props.titulo) ? props.titulo || '' : '',
        datasets: [{
            //label: 'Avisos enviados',
            backgroundColor: 'rgb(153, 102, 255)',
            borderColor: 'rgb(153, 102, 255)',
            //data: (props.list) ? props.list.afastamento : [],
        }]
    };

    return (
        <>
            <DashboardWidgetsList title={`Consulta ${props.titulo}`} data={data} show={show} onHide={() => setShow(false)} />
            <a href="#" onClick={() => {props.getWidgetsPesquisar({tipo: props.tipo}); setShow(true) }}>
                <div className={`small-box`}>
                <div className='inner' style={{backgroundColor: '#3379b7'}} >   
                        <h3 style={{color: 'white'}} >{props.value}</h3>
                        <h4 style={{color: 'white'}}><strong>{props.titulo}</strong></h4>
                    </div> 
                    <div className='icon'> 
                        <i className={`fa fa-${props.icone}`} style={{color: 'white'}}></i>
                    </div> 

                    <div className="inner" style={{backgroundColor: '#f5f5f5', fontSize: 25}} >
                        <div className="d-flex justify-content-between">
                            <h3 className="card-title" style={{fontSize: 20, fontFamily: 'sans-serif'}} >Ver Detalhes</h3>
                            <ButtonLink
                                iconright='arrow-circle-right'
                                onClick={() => {
                                    props.getWidgetsPesquisar({ tipo: props.tipo });
                                    setShow(true)
                                }}
                            />
                        </div>
                    </div>                    
                </div> 
            </a>
        </>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({ getWidgetsPesquisar }, dispatch)
export default connect(null, mapDispatchToProps)(Widget)