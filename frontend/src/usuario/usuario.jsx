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
import { init, create, update } from './usuarioActions';

import List from './usuarioList';
import Form from './usuarioForm'

const Usuario = props => {

    // quando passa [] como segundo parametro, o useEffect funciona como o create da class, é chamado só uma vez quando termina de carregar o componente
    useEffect(() => {
        props.init();
    }, []);

    const parentID = { ID: 'CAD_USUARIO' };

    return (
        <Content>
            <Tabs>
                <TabsHeader>
                    <TabHeader label='Listar' icon='list' target='tabListUsuario' getParent={parentID} />

                    <TabHeader label='Incluir' icon='plus' target='tabCreateUsuario' getParent={parentID} />
                    <TabHeader label='Alterar' icon='pencil-alt' target='tabUpdateUsuario' getParent={parentID} />
                </TabsHeader>
                <TabsContent>
                    <TabContent id='tabListUsuario' getParent={parentID}>
                        <List />
                    </TabContent>
                    <TabContent id='tabCreateUsuario' getParent={parentID}>
                        <Form name='tabCreateUsuarioForm' onSubmit={props.create} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                    <TabContent id='tabUpdateUsuario' getParent={parentID}>
                        <Form name='tabUpdateUsuarioForm' onSubmit={props.update} readOnly={true} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                </TabsContent>
            </Tabs>
        </Content>
    )
}

const mapStateToProps = state => ({ list: state.usuarioCad.list })
const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Usuario)