import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showUpdate, remove, update, getList } from './tagActions'
import SPButton from '../common/form/spButton';
import { msgQuestion } from '../common/msg/msg';
import { columnYesNo } from '../common/grid/conlumnsConfig';
import ReactTableV8 from '../common/grid/gridReactTableV8';
import { CardBodyTable } from '../common/layout/card';

const TagList = (props) => {

   const [dataList, setDataList] = useState(props.list || []);

    useEffect(() => {
        setDataList(props.list);
    }, [props.list])

    function removerTag(data) {
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
                        <SPButton type='button' className='danger btn-sm' icon='trash' data-title='Excluir' onClick={() => removerTag(row.original)} />
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
            accessorKey: 'cor',
            id: 'cor',
            header: 'Cor',
            size: 50,
            headerClassName: 'header_left',
            cell: ({ row }) => {
                return (
                    <div style={{backgroundColor: row.original.cor, width: '100%', height: '100%'}}>
                    </div>
                )
            }
        },
        {
            accessorKey: 'titulo',
            id: 'titulo',
            header: 'Título',
            minSize: 50,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'descricao',
            id: 'descricao',
            header: 'Descrição',
            minSize: 50,
            headerClassName: 'header_left',
        }
    ]

    return (
        <CardBodyTable>
            <ReactTableV8
                id='tagList'
                data={dataList}
                columns={columnsV8}
                updateListFn={props.getList}
            />
        </CardBodyTable>
    )
}
const mapStateToProps = state => ({ 
    list: state.tagCad.list,
    stateReq: state.tagCad.stateReq 
})
const mapDispatchToProps = dispatch => bindActionCreators({ showUpdate, remove, update, getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TagList)