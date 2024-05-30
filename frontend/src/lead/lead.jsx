import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
import { init, create, update } from './leadActions';

import List from './leadList';
import Form from './leadForm'

const Lead = props => {

    // quando passa [] como segundo parametro, o useEffect funciona como o create da class, é chamado só uma vez quando termina de carregar o componente
    useEffect(() => {
        props.init();
    }, []);

    const parentID = { ID: 'CAD_LEAD' };

    return (
        <Content>
            <Tabs>
                <TabsHeader>
                    <TabHeader label='Listar' icon='list' target='tabListLead' getParent={parentID} />

                    <TabHeader label='Incluir' icon='plus' target='tabCreateLead' getParent={parentID} />
                    <TabHeader label='Alterar' icon='pencil-alt' target='tabUpdateLead' getParent={parentID} />
                </TabsHeader>
                <TabsContent>
                    <TabContent id='tabListLead' getParent={parentID}>
                        <List />
                    </TabContent>
                    <TabContent id='tabCreateLead' getParent={parentID}>
                        <Form name='tabCreateLeadForm' onSubmit={props.create} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                    <TabContent id='tabUpdateLead' getParent={parentID}>
                        <Form name='tabUpdateLeadForm' onSubmit={props.update} readOnly={true} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                </TabsContent>
            </Tabs>
        </Content>
    )
}

const mapStateToProps = state => ({ list: state.leadCad.list })
const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Lead)