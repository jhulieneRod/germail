import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showUpdate, remove, update, getList } from './configuracaoActions'
import SPButton from '../common/form/spButton';
import { msgQuestion } from '../common/msg/msg';
import ReactTableV8 from '../common/grid/gridReactTableV8';
import { CardBodyTable } from '../common/layout/card';

const ConfiguracaoList = (props) => {

   const [dataList, setDataList] = useState(props.list || []);

    useEffect(() => {
        setDataList(props.list);
    }, [props.list])

    function remover(data) {
        msgQuestion('Deseja realmente excluir?')
        .then((result) => {
            if (result.value) {
                props.remove(data);
            }
        });
    }

    const columnsV8 = [
        {
            accessorKey: '',
            id: 'button_grid',
            cell: ({ row }) => {
                return (
                    <div>
                        <SPButton type='button' className='warning btn-sm' icon='pencil-alt' data-title='Alterar' onClick={() => props.showUpdate(row.original)} />
                        <SPButton type='button' className='danger btn-sm' icon='trash' data-title='Excluir' onClick={() => remover(row.original)} />
                        <SPButton type='button' className='info btn-sm' icon={(row.original.status === 0) ? 'check' : 'xmark'} data-title={(row.original.status === 0) ? 'Ativar' : 'Desativar'} onClick={() => props.update({id: row.original.id, status: !row.original.status})} />
                    </div>
                )
            },
            minSize: 120,
            size: 120,
            className: 'column_icon',
        },
        {
            accessorKey: 'id',
            id: 'id',
            header: 'Código',
            minSize: 70,
            size: 70
        },
        {
            accessorKey: 'titulo',
            id: 'titulo',
            header: 'Título',
            minSize: 50,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'status_descricao',
            id: 'status_descricao',
            header: 'Status',
            minSize: 50,
            headerClassName: 'header_left',
        }
    ]

    return (
        <CardBodyTable>
            <ReactTableV8
                id='configuracaoList'
                data={dataList}
                columns={columnsV8}
                updateListFn={props.getList}
            />
        </CardBodyTable>
    )
}
const mapStateToProps = state => ({ 
    list: state.configuracaoCad.list,
    stateReq: state.configuracaoCad.stateReq 
})
const mapDispatchToProps = dispatch => bindActionCreators({ showUpdate, remove, update, getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ConfiguracaoList)