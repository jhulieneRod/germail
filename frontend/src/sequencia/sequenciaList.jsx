import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showUpdate, remove, update, getList, insereFluxo } from './sequenciaActions'
import SPButton from '../common/form/spButton';
import { msgQuestion } from '../common/msg/msg';
import ReactTableV8 from '../common/grid/gridReactTableV8';
import { CardBodyTable } from '../common/layout/card';

const SequenciaList = (props) => {

   const [dataList, setDataList] = useState(props.list || []);

    useEffect(() => {
        setDataList(props.list);
    }, [props.list])

    function removerSequencia(data) {
        msgQuestion('Deseja realmente excluir?')
        .then((result) => {
            if (result.value) {
                props.remove(data);
            }
        });
    }

    const onClickFluxo = (linha) => {
        if(linha.fluxo){
            props.onSelectSequencia(linha.fluxo);
        }else{
            props.insereFluxo(linha.id, props.onSelectSequencia);
        }
    };

    const columnsV8 = [
        {
            accessorKey: '',
            id: 'button_grid',
            cell: ({ row }) => {
                return (
                    <div>
                        <SPButton type='button' className='warning btn-sm' icon='pencil-alt' data-title='Alterar' onClick={() => props.showUpdate(row.original)} />
                        <SPButton type='button' className='danger btn-sm' icon='trash' data-title='Excluir' onClick={() => removerSequencia(row.original)} />
                        <SPButton type='button' className='info btn-sm' icon='layer-group' data-title='Fluxo' onClick={() => onClickFluxo(row.original)} />
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
            accessorKey: 'nome',
            id: 'nome',
            header: 'Nome',
            minSize: 50,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'ultima_alteracao',
            id: 'ultima_alteracao',
            header: 'Última Alteração',
            minSize: 50,
            headerClassName: 'header_left',
        }
    ]

    return (
        <CardBodyTable>
            <ReactTableV8
                id='sequenciaList'
                data={dataList}
                columns={columnsV8}
                updateListFn={props.getList}
            />
        </CardBodyTable>
    )
}
const mapStateToProps = state => ({ 
    list: state.sequenciaCad.list,
    stateReq: state.sequenciaCad.stateReq 
})
const mapDispatchToProps = dispatch => bindActionCreators({ showUpdate, remove, update, getList, insereFluxo }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SequenciaList)