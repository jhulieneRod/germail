import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { showUpdate, remove, update, getList, showGerenciamento } from './processoActions'
import SPButton from '../common/form/spButton';
import { msgQuestion } from '../common/msg/msg';
import ReactTableV8 from '../common/grid/gridReactTableV8';
import { CardBodyTable } from '../common/layout/card';

const ProcessoList = (props) => {

    const [dataList, setDataList] = useState(props.list || []);

    useEffect(() => {
        setDataList(props.list);
    }, [props.list])

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
                    <SPButton type='button' className='info btn-sm' icon='gear' data-title='Gerenciar' onClick={() => gerenciaProcesso(row.original)} />
                    <SPButton type='button' className='warning btn-sm' icon='pencil-alt' data-title='Alterar' onClick={() => props.showUpdate(row.original)} />
                    <SPButton type='button' className='danger btn-sm' icon='trash' data-title='Excluir' onClick={() => removerProcesso(row.original)} />
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
        <CardBodyTable>
            <ReactTableV8
                id='processoList'
                data={dataList}
                columns={columnsV8}
                updateListFn={props.getList}
            />
        </CardBodyTable>
    )
}
const mapStateToProps = state => ({ list: state.processoCad.list, stateReq: state.processoCad.stateReq })
const mapDispatchToProps = dispatch => bindActionCreators({ showUpdate, remove, update, getList, showGerenciamento }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ProcessoList)