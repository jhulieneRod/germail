import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
import { init, create, update, showFluxo } from './sequenciaActions';

import List from './sequenciaList';
import Form from './sequenciaForm';
import Fluxo from '../fluxo/fluxo';

const Sequencia = props => {

    // quando passa [] como segundo parametro, o useEffect funciona como o create da class, é chamado só uma vez quando termina de carregar o componente
    useEffect(() => {
        props.init();
    }, []);

    const parentID = { ID: 'CAD_SEQUENCIA' };

    const [fluxo, setFluxo] =  useState(false);
    const mostraFluxoSequencia = (idFluxo) => {
        if(idFluxo){
            setFluxo(idFluxo);
            props.showFluxo(idFluxo);
        }
    }

    return (
        <Content>
            <Tabs>
                <TabsHeader>
                    <TabHeader label='Listar' icon='list' target='tabListSequencia' getParent={parentID} />

                    <TabHeader label='Incluir' icon='plus' target='tabCreateSequencia' getParent={parentID} />
                    <TabHeader label='Alterar' icon='pencil-alt' target='tabUpdateSequencia' getParent={parentID} />
                </TabsHeader>
                <TabsContent>
                    <TabContent id='tabListSequencia' getParent={parentID}>
                        <List onSelectSequencia={mostraFluxoSequencia} />
                    </TabContent>
                    <TabContent id='tabCreateSequencia' getParent={parentID}>
                        <Form name='tabCreateSequenciaForm' onSubmit={props.create} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                    <TabContent id='tabUpdateSequencia' getParent={parentID}>
                        <Form name='tabUpdateSequenciaForm' onSubmit={props.update} readOnly={true} submitClass='primary' submitLabel='Salvar' />
                    </TabContent>
                    <TabContent id='tabFluxoSequencia' getParent={parentID}>
                        <Fluxo fluxo={fluxo} onClickVoltar={() => props.init(false)}/>
                    </TabContent>
                </TabsContent>
            </Tabs>
        </Content>
    )
}

const mapStateToProps = state => ({ list: state.sequenciaCad.list })
const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update, showFluxo }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Sequencia)