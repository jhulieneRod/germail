import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ButtonLink from '../form/buttonLink';
import { Card, CardBody } from '../layout/card';
import { getWidgetsPesquisar } from '../../dashboard/dashboardActions';
import DashboardWidgetsList from '../../dashboard/dashboardWidgetList';
import Grid from '../layout/grid'

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
        <Card>
            <Grid cols={props.cols}> 
                <div className={`small-box bg-blue`}> 
                    <div className='inner'> 
                        <h3>{props.value}</h3>
                        <h4><strong>{props.titulo}</strong></h4>
                    </div> 
                    <div className='icon'> 
                        <i className={`fa fa-${props.icone}`}></i>
                    </div> 
                </div> 
           
          
                <DashboardWidgetsList title={`Consulta ${props.titulo}`} data={data} show={show} onHide={() => setShow(false)} />
                <div className="card-header border-0 pl-4 pr-4">
                    <div className="d-flex justify-content-between">
                        <h3 className="card-title">Ver Detalhes</h3>
                        <ButtonLink
                            iconright='arrow-circle-right'
                            onClick={() => {
                                props.getWidgetsPesquisar({ tipo: props.tipo });
                                setShow(true)
                            }}
                        />
                    </div>
                </div>
            </Grid> 
        </Card>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({ getWidgetsPesquisar }, dispatch)
export default connect(null, mapDispatchToProps)(Widget)