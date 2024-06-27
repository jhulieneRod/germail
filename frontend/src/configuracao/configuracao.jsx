import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
import { init, update, create } from './configuracaoActions';

import Form from './configuracaoForm';
import List from './configuracaoList';

const Configuracao = props => {

    useEffect(() => {
        props.init();
    }, []);

    const parentID = { ID: 'CAD_CONFIGURACAO' };

    return (
        <Content>
            <Tabs>
                <TabsHeader>
                    <TabHeader label='Listar' icon='list' target='tabListConfiguracao' getParent={parentID} />

                    <TabHeader label='Incluir' icon='plus' target='tabCreateConfiguracao' getParent={parentID} />
                    <TabHeader label='Alterar' icon='pencil-alt' target='tabUpdateConfiguracao' getParent={parentID} />
                </TabsHeader>
                <TabsContent>
                    <TabContent id='tabListConfiguracao' getParent={parentID}>
                        <List />
                    </TabContent>
                    <TabContent id='tabCreateConfiguracao' getParent={parentID}>
                        <Form name='tabCreateConfiguracaoForm' onSubmit={props.create} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                    <TabContent id='tabUpdateConfiguracao' getParent={parentID}>
                        <Form name='tabUpdateConfiguracaoForm' onSubmit={props.update} readOnly={true} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                </TabsContent>
            </Tabs>
        </Content>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({ init, update, create }, dispatch)
export default connect(null, mapDispatchToProps)(Configuracao)