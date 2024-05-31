import React, { useEffect, useState } from 'react';
import Content from '../common/template/content';
import Row from '../common/layout/row';
import Grid from '../common/layout/grid';
import ValueBox4 from '../common/widget/valueBox4';
import { CardBodyScroll } from '../common/layout/card';
import LogDestinatarioEmailList from '../logDestinatarioEmail/logDestinatarioEmailList';
import { Card } from 'react-bootstrap';

const DashboardEmail = props => {

    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [btnExport, setBtnExport] = useState(true);
    const [tipoRegistro, setTipoRegistro] = useState(0);

    return (
        <>
            <Content>
                <Card>
                    <CardBodyScroll discountHeight='138'>
                        <Grid cols='12'>
                            <Row>
                                <h4>Últimas Atualizações</h4>
                            </Row>
                            <Row>
                            <LogDestinatarioEmailList></LogDestinatarioEmailList>
                            </Row>
                        </Grid>
                    </CardBodyScroll>
                </Card>
            </Content>
        </>
    )
}

export default DashboardEmail;