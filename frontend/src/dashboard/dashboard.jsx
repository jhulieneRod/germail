import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import Row from '../common/layout/row';
import Grid from '../common/layout/grid';
import ValueBox4 from '../common/widget/valueBox4';
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

    return (
        <>
            <Content>
                <CardBodyScroll discountHeight='138'>
                    <Grid cols='12'>
                        <Row>
                            {/* <ValueBox4
                                cols='12 4'
                                title='Orçamento'
                                value={10}
                                icon='file-invoice-dollar'
                                tipo={1}
                                color='#3C8DBC'
                            /> */}
                            {/* <ValueBox4
                                cols='12 4'
                                title='Elaboração de Contrato/Proposta'
                                value={5}
                                icon='file-invoice'
                                tipo={1}
                                color='#613cbc'
                            />
                            <ValueBox4
                                cols='12 4'
                                title='Elaboração de Quesitação'
                                value={3}
                                icon='file-circle-question'
                                tipo={1}
                                color='#3cbcbc'
                            /> */}
                        </Row>
                        {/* <Row>
                            <ValueBox4
                                cols='12 4'
                                title='Coleta de Material'
                                value={21}
                                icon='briefcase'
                                tipo={1}
                                color='#bc653c'
                            />
                            <ValueBox4
                                cols='12 4'
                                title='Análise Pericial'
                                value={1}
                                icon='magnifying-glass'
                                tipo={1}
                                color='#bd5493'
                            />
                            <ValueBox4
                                cols='12 4'
                                title='Elaboração Laudo ou Parecer'
                                value={2}
                                icon='clipboard-check'
                                tipo={1}
                                color='#bc8f3c'
                            />
                        </Row>
                        <Row>
                            <ValueBox4
                                cols='12 4'
                                title='Entrega'
                                value={6}
                                icon='circle-check'
                                tipo={1}
                                color='#3cbc8d'
                            />
                            <ValueBox4
                                cols='12 4'
                                title='Aguardando Pagamento'
                                value={9}
                                icon='dollar-sign'
                                tipo={1}
                                color='#bc3c3c'
                            />
                            <ValueBox4
                                cols='12 4'
                                title='Arquivado'
                                value={35}
                                icon='folder-closed'
                                tipo={1}
                                color='#1f8d27'
                            />
                        </Row> */}
                    </Grid>
                </CardBodyScroll>
            </Content>
        </>
    )
}

export default DashboardProcesso;