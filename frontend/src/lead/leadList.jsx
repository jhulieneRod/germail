import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showUpdate, remove, update, getList } from './leadActions'
import SPButton from '../common/form/spButton';
import { msgQuestion } from '../common/msg/msg';
import { columnYesNo } from '../common/grid/conlumnsConfig';
import ReactTableV8 from '../common/grid/gridReactTableV8';
import { CardBodyTable } from '../common/layout/card';

const LeadList = (props) => {

   const [dataList, setDataList] = useState(props.list || []);

    useEffect(() => {
        setDataList(props.list);
    }, [props.list])

    function removerLead(data) {
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
                        <SPButton type='button' className='danger btn-sm' icon='trash' data-title='Excluir' onClick={() => removerLead(row.original)} />
                        <SPButton type='button' className='info btn-sm' icon={(row.original.status === 0) ? 'user-plus' : 'user-minus'} data-title={(row.original.status === 0) ? 'Ativar' : 'Desativar'} onClick={() => props.update({id: row.original.id, status: !row.original.status})} />
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
            accessorKey: 'email',
            id: 'email',
            header: 'E-mail',
            minSize: 50,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'status_descricao',
            id: 'status_descricao',
            header: 'Status',
            minSize: 50,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'pontuacao',
            id: 'pontuacao',
            header: 'Pontuação',
            minSize: 50,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'tag',
            id: 'tag',
            header: 'Tag',
            size: 150,
            headerClassName: 'header_left',
            cell: ({ row }) => {
                let tag = row.original.tag ? row.original.tag.split(':::') : false;
                
                return (tag) ? (
                    <div style={
                        {
                            backgroundColor: tag[2], 
                            padding: '3px', 
                            borderRadius: '100px 0 100px 0',
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFF',
                            fontWeight: '600'
                        }}>
                        {tag[1]}
                    </div>
                ) : ''
            }
        },
    ]

    return (
        <CardBodyTable>
            <ReactTableV8
                id='leadList'
                data={dataList}
                columns={columnsV8}
                updateListFn={props.getList}
            />
        </CardBodyTable>
    )
}
const mapStateToProps = state => ({ 
    list: state.leadCad.list,
    stateReq: state.leadCad.stateReq 
})
const mapDispatchToProps = dispatch => bindActionCreators({ showUpdate, remove, update, getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(LeadList)