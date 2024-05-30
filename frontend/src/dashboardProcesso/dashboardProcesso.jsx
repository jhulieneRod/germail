import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import Row from '../common/layout/row';
import Grid from '../common/layout/grid';
import ValueBox from '../common/widget/valueBox';
import Widget from '../common/widget/widget';

import { CardBodyScroll } from '../common/layout/card';
import DashboardWidgetsList from '../dashboard/dashboardWidgetList';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const DashboardProcesso = props => {

    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [btnExport, setBtnExport] = useState(true);
    const [tipoRegistro, setTipoRegistro] = useState(0);

    useEffect(() => {
        console.log(props);
        debugger;
    }, [props])

    return (
        <>
            <ContentHeader className='content_header_dashboard' title={props.processo?.descricao || 'Gerenciamento de Processo'} />
            <Content>
                <CardBodyScroll discountHeight='138'>
                    <Grid cols='12'>
                        <Row>
                            <ValueBox
                                cols='12'
                                value='Orçamento'
                                text={'blablabla'}
                                icon='file-invoice-dollar'
                                tipo={1}
                                color='#3C8DBC'
                                onClick={() => {
                                    // props.getWidgetsPesquisar({ tipo: 1 });
                                    // setTitulo('Admissão');
                                    // setBtnExport(true);
                                    // setShow(true);
                                    // setTipoRegistro(1);
                                }}
                            />
                        </Row>
                        <Row>
                            <ValueBox
                                cols='12 '
                                value='Elaboração de Contrato/Proposta'
                                text={'Texto de exemplo blablabla'}
                                icon='file-invoice'
                                tipo={1}
                                color='#3C8DBC'
                                onClick={() => {
                                    // props.getWidgetsPesquisar({ tipo: 1 });
                                    // setTitulo('Admissão');
                                    // setBtnExport(true);
                                    // setShow(true);
                                    // setTipoRegistro(1);
                                }}
                            />
                        </Row>
                        <Row>
                            <ValueBox
                                cols='12'
                                value='Elaboração de Quesitação'
                                text={'Texto de exemplo blablabla'}
                                icon='file-circle-question'
                                tipo={1}
                                color='#3C8DBC'
                                onClick={() => {
                                    // props.getWidgetsPesquisar({ tipo: 1 });
                                    // setTitulo('Admissão');
                                    // setBtnExport(true);
                                    // setShow(true);
                                    // setTipoRegistro(1);
                                }}
                            />
                        </Row>
                        <Row>
                            <ValueBox
                                cols='12'
                                value='Coleta de Material'
                                text={'Texto de exemplo blablabla'}
                                icon='briefcase'
                                tipo={1}
                                color='#3C8DBC'
                                onClick={() => {
                                    // props.getWidgetsPesquisar({ tipo: 1 });
                                    // setTitulo('Admissão');
                                    // setBtnExport(true);
                                    // setShow(true);
                                    // setTipoRegistro(1);
                                }}
                            />
                        </Row>
                        <Row>
                            <ValueBox
                                cols='12'
                                value='Análise Pericial'
                                text={'Texto de exemplo blablabla'}
                                icon='magnifying-glass'
                                tipo={1}
                                color='#3C8DBC'
                                onClick={() => {
                                    // props.getWidgetsPesquisar({ tipo: 1 });
                                    // setTitulo('Admissão');
                                    // setBtnExport(true);
                                    // setShow(true);
                                    // setTipoRegistro(1);
                                }}
                            />
                        </Row>
                        <Row>
                            <ValueBox
                                cols='12'
                                value='Elaboração Laudo ou Parecer'
                                text={'Texto de exemplo blablabla'}
                                icon='clipboard-check'
                                tipo={1}
                                color='#3C8DBC'
                                onClick={() => {
                                    // props.getWidgetsPesquisar({ tipo: 1 });
                                    // setTitulo('Admissão');
                                    // setBtnExport(true);
                                    // setShow(true);
                                    // setTipoRegistro(1);
                                }}
                            />
                        </Row>
                        <Row>
                            <ValueBox
                                cols='12'
                                value='Entrega'
                                text={'Texto de exemplo blablabla'}
                                icon='circle-check'
                                tipo={1}
                                color='#3C8DBC'
                                onClick={() => {
                                    // props.getWidgetsPesquisar({ tipo: 1 });
                                    // setTitulo('Admissão');
                                    // setBtnExport(true);
                                    // setShow(true);
                                    // setTipoRegistro(1);
                                }}
                            />
                        </Row>
                        <Row>
                            <ValueBox
                                cols='12'
                                value='Aguardando Pagamento'
                                text={'Texto de exemplo blablabla'}
                                icon='dollar-sign'
                                tipo={1}
                                color='#3C8DBC'
                                onClick={() => {
                                    // props.getWidgetsPesquisar({ tipo: 1 });
                                    // setTitulo('Admissão');
                                    // setBtnExport(true);
                                    // setShow(true);
                                    // setTipoRegistro(1);
                                }}
                            />
                        </Row>
                        <Row>
                            <ValueBox
                                cols='12'
                                value='Arquivado'
                                text={'Texto de exemplo blablabla'}
                                icon='folder-closed'
                                tipo={1}
                                color='#3C8DBC'
                                onClick={() => {
                                    // props.getWidgetsPesquisar({ tipo: 1 });
                                    // setTitulo('Admissão');
                                    // setBtnExport(true);
                                    // setShow(true);
                                    // setTipoRegistro(1);
                                }}
                            />
                        </Row>
                    </Grid>
                </CardBodyScroll>
            </Content>
        </>
    )
}

export default DashboardProcesso;