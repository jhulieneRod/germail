import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Content from '../common/template/content';
import Row from '../common/layout/row';
import Grid from '../common/layout/grid';
import ValueBoxEmail from '../common/widget/valueBoxEmail';
import { CardBodyScroll } from '../common/layout/card';
import { Card } from 'react-bootstrap';
import { getList } from './dashboardActions';

const DashboardEmail = props => {

    const [dataList, setDataList] = useState(props.list ?? {});

    useEffect(() => {
        if(props.list){
            setDataList(props.list);
        }
    }, [props.list])

    useEffect(() => {
        props.getList();
    }, [])

    return (
        <>
            <Content>
                <Card>
                    <CardBodyScroll discountHeight='138'>
                        <Grid cols='12'>
                            <Row>
                                <ValueBoxEmail 
                                    name='logDestinatarioEmailListEnviado'
                                    title='E-mails Enviados'
                                    valor={dataList.emails_enviados}
                                    color={'#2E8B57'}
                                    icon={'envelope-circle-check'}
                                    cols='4'
                                    tipo={1}
                                />
                                <ValueBoxEmail 
                                    name='logDestinatarioEmailListAberto'
                                    title='E-mails Abertos'
                                    valor={dataList.emails_abertos}
                                    color={'#008B8B'}
                                    icon={'envelope-open'}
                                    cols='4'
                                    tipo={2}
                                />
                                </Row>
                        </Grid>
                    </CardBodyScroll>
                </Card>
            </Content>
        </>
    )
}

const mapStateToProps = state => ({ list: state.dashboard.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DashboardEmail)