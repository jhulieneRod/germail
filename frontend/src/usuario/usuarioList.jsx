import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showUpdate, remove, update, getList, getTelaList } from './usuarioActions'
import SPButton from '../common/form/spButton';
import { msgQuestion } from '../common/msg/msg';
import { columnYesNo } from '../common/grid/conlumnsConfig';
import ReactTableV8 from '../common/grid/gridReactTableV8';
import { CardBodyTable } from '../common/layout/card';

const UsuarioList = (props) => {

   const [dataList, setDataList] = useState(props.list || []);
//    const [dataListTela, setDataListTela] = useState(props.listTela || []);


    useEffect(() => {
        setDataList(props.list);
    }, [props.list])

    useEffect(() => {
        // setDataListTela(props.listTela);
    }, [props.listTela])


    function removerUsuario(data) {
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
                        <SPButton type='button' className='danger btn-sm' icon='trash' data-title='Excluir' onClick={() => removerUsuario(row.original)} />
                    </div>
                )
            },
            minSize: 81,
            size: 81,
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
            accessorKey: 'usuario',
            id: 'usuario',
            header: 'Usuário',
            minSize: 50,
            headerClassName: 'header_left',
        },
        {
            ...columnYesNo,
            accessorKey: 'x_ativo',
            id: 'x_ativo',
            header: 'Ativo',
        }
    ]

    return (
        <CardBodyTable>
            <ReactTableV8
                id='userList'
                data={dataList}
                columns={columnsV8}
                updateListFn={props.getList}
            />
        </CardBodyTable>
    )
}
const mapStateToProps = state => ({ 
    list: state.usuarioCad.list, 
    listTela: state.usuarioCad.listTela,
    stateReq: state.usuarioCad.stateReq 
})
const mapDispatchToProps = dispatch => bindActionCreators({ showUpdate, remove, update, getList, getTelaList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UsuarioList)