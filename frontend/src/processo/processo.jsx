import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
import { init, create, update } from './processoActions';

import List from './processoList';
import Form from './processoForm';
import DashboardProcesso from '../dashboardProcesso/dashboardProcesso';

const Processo = props => {

    useEffect(() => {
        props.init();
    }, []);

    const parentID = { ID: 'CAD_PROCESSO' };

    const [processo, setProcesso] = useState({});

    return (
        <Content>
            <Tabs>
                <TabsHeader>
                    <TabHeader label='Listar' icon='list' target='tabListProcesso' getParent={parentID} />
                    <TabHeader label='Gerenciar' icon='gear' target='tabGerenciamentoProcesso' getParent={parentID} />
                    <TabHeader label='Incluir' icon='plus' target='tabCreateProcesso' getParent={parentID} />
                    <TabHeader label='Alterar' icon='pencil-alt' target='tabUpdateProcesso' getParent={parentID} />
                </TabsHeader>
                <TabsContent>
                    <TabContent id='tabGerenciamentoProcesso' getParent={parentID}>
                        <DashboardProcesso processo={processo}/>
                    </TabContent>
                    <TabContent id='tabListProcesso' getParent={parentID}>
                        <List onGerenciaProcesso={setProcesso}/>
                    </TabContent>
                    <TabContent id='tabCreateProcesso' getParent={parentID}>
                        <Form name='tabCreateProcessoForm' onSubmit={props.create} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                    <TabContent id='tabUpdateProcesso' getParent={parentID}>
                        <Form name='tabUpdateProcessoForm' onSubmit={props.update} readOnly={true} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                </TabsContent>
            </Tabs>
        </Content>
    )
}

const mapStateToProps = state => ({ list: state.processoCad.list })
const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Processo)