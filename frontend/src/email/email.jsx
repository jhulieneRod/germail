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
import { init, create, update, showVisualizar, enviaEmail } from './emailActions';

import List from './emailList';
import Form from './emailForm';
import VisualizarEmail from './emailVisualizar';
import ListDestinatarios from '../destinatarioEmail/destinatarioEmailList';
import { CardFooter } from '../common/layout/card';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { showDestinatarios } from '../destinatarioEmail/destinatarioEmailActions';

const Email = props => {

    const [email, setEmail] = useState('');

    // quando passa [] como segundo parametro, o useEffect funciona como o create da class, é chamado só uma vez quando termina de carregar o componente
    useEffect(() => {
        props.init();
    }, []);

    const onClickDestinatario = (email) => {
        setEmail(email);
        props.showDestinatarios(email);
    }

    const parentID = { ID: 'CAD_EMAIL' };

    return (
        <Content>
            <Tabs>
                <TabsHeader>
                    <TabHeader label='Listar' icon='list' target='tabListEmail' getParent={parentID} />

                    <TabHeader label='Incluir' icon='plus' target='tabCreateEmail' getParent={parentID} />
                    <TabHeader label='Alterar' icon='pencil-alt' target='tabUpdateEmail' getParent={parentID} />
                    <TabHeader label='Destinatários' icon='user' target='tabDestinatariosEmail' getParent={parentID} />
                </TabsHeader>
                <TabsContent>
                    <TabContent id='tabListEmail' getParent={parentID}>
                        <List  onClickDestinatario={onClickDestinatario} />
                    </TabContent>
                    <TabContent id='tabCreateEmail' getParent={parentID}>
                        <Form name='tabCreateEmailForm' onSubmit={props.create} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                    <TabContent id='tabUpdateEmail' getParent={parentID}>
                        <Form name='tabUpdateEmailForm' onSubmit={props.update} readOnly={true} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                    <TabContent id='tabDestinatariosEmail' getParent={parentID}>
                        <ListDestinatarios email={email}/>
                    </TabContent>
                </TabsContent>
            </Tabs>
        </Content>
    )
}

const mapStateToProps = state => ({ list: state.emailCad.list })
const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update, showDestinatarios, showVisualizar, enviaEmail }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Email)