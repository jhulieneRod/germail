import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '../layout/grid';
import ButtonLink from '../form/buttonLink';
import { getWidgetsPesquisar } from '../../dashboard/dashboardActions';
import DashboardWidgetsList from '../../dashboard/dashboardWidgetList';

const ValueBox4 = props => {

    const [show, setShow] = useState(false); 

    const data = {
        labels: (props.title) ? props.title || '' : '',
        datasets: [{
            //label: 'Avisos enviados',
            backgroundColor: 'rgb(153, 102, 255)',
            borderColor: 'rgb(153, 102, 255)',
            //data: (props.list) ? props.list.afastamento : [],
        }]
    };

    return (
        <>
            <DashboardWidgetsList title={`Consulta ${props.title}`} data={data} show={show} onHide={() => setShow(false)} />
            <Grid cols={props.cols}>
                <div className="small-box" 
                    style={
                        {
                            backgroundColor: props.color,
                            color: '#fff'
                        }
                    }>
                    <div className="inner">
                        <h3>{props.value}</h3>
                        <p>{props.title}</p>
                    </div>
                    <div className="icon">
                        <i className={`fas fa-${props.icon}`}></i>
                    </div>
                    <a href="#" 
                        className="small-box-footer" 
                        onClick={() => {
                            props.getWidgetsPesquisar({ tipo: props.tipo });
                            setShow(true)
                        }}>
                        Ver Processos <i className="fas fa-arrow-circle-right"></i>
                    </a>
                </div>
            </Grid>
        </>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({ getWidgetsPesquisar }, dispatch)
export default connect(null, mapDispatchToProps)(ValueBox4)