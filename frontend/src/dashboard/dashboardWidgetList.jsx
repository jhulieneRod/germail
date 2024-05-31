import React, { useState, useEffect } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SPButton from '../common/form/spButton';
import ModalQuery from '../common/modal/modalQuery';
import { msgQuestion } from '../common/msg/msg';

const DashboardWidgetsList = (props) => {

    const [dataList, setDataList] = useState([{id: 1, descricao: 'Processo Teste', prazo: '10/08/2024'}]);

    function removerProcesso(data) {
        msgQuestion('Deseja realmente excluir?')
            .then((result) => {
                if (result.value) {
                    props.remove(data);
                }
            });
    }

    function gerenciaProcesso(values){
        if(props.onGerenciaProcesso){
            props.onGerenciaProcesso(values);
        }
        props.showGerenciamento();
    }

    const columnsV8 = [
        {
            accessorKey: '',
            id: 'button_grid',
            cell: ({ row }) => (
                <div>
                    <SPButton type='button' className='info btn-sm' icon='gear' data-title='Gerenciar' onClick={() => {/*gerenciaProcesso(row.original)*/}} />
                    <SPButton type='button' className='warning btn-sm' icon='pencil-alt' data-title='Alterar' onClick={() => {/*props.showUpdate(row.original)*/}} />
                    <SPButton type='button' className='danger btn-sm' icon='trash' data-title='Excluir' onClick={() => {/*removerProcesso(row.original)*/}} />
                </div>
            ),
            minSize: 120,
            size: 120,
            className: 'column_icon',
        },
        {
            accessorKey: 'id',
            id: 'id',
            header: 'ID',
            minSize: 70,
            size: 70
        },
        {
            accessorKey: 'descricao',
            id: 'descricao',
            header: 'Descrição',
            minSize: 300,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'prazo',
            id: 'prazo',
            header: 'Prazo',
            minSize: 300,
            headerClassName: 'header_left',
        }
    ]

    return (
        <ModalQuery
            columns={columnsV8}
            data={dataList}
            loading={false}
            show={props.show}
            onHide={props.onHide}
            title={`${props.title}`}
        />
    )
}
const mapStateToProps = state => ({ list: state.dashboard.widgetPesquisar, stateReq: state.dashboard.stateReq })
// const mapDispatchToProps = dispatch => bindActionCreators({ getLogsAvisos }, dispatch)
export default connect(mapStateToProps, null)(DashboardWidgetsList)