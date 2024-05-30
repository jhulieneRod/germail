import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
import { init } from './configuracaoActions';

import ConfiguracaoForm from './configuracaoForm';

const Configuracao = props => {

    useEffect(() => {
        props.init();
    }, []);

    const parentID = { ID: 'CAD_CONFIGURACAO' };

    return (
        <Content>
            <Tabs>
                <TabsHeader>
                    <TabHeader label='E-mail' icon='gear' target='tabConfEmail' getParent={parentID} />
                </TabsHeader>
                <TabsContent>
                    <TabContent id='tabConfEmail' getParent={parentID}>
                        <ConfiguracaoForm submitClass='primary' submitLabel='Salvar' name="configuracaoEmailForm" tipo={1} />
                    </TabContent>
                </TabsContent>
            </Tabs>
        </Content>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(null, mapDispatchToProps)(Configuracao)