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
            accessorKey: 'tags',
            id: 'tags',
            header: 'Tag',
            size: 400,
            headerClassName: 'header_left',
            cell: ({ row }) => {
                let tags = row.original.tags ? row.original.tags.split(',') : [];
        
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', overflow:'auto', alignSelf:'self-start' }}>
                        {tags.map((tag, index) => {
                            let [label, color, id] = tag.split(':::');
                            return (
                                <div 
                                    key={index}
                                    style={{
                                        backgroundColor: color, 
                                        padding: '3px', 
                                        borderRadius: '100px 0 100px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FFF',
                                        fontWeight: '600',
                                        minWidth: '120px',
                                        fontSize:'small',
                                        height:'20px'
                                    }}>
                                    {label}
                                </div>
                            );
                        })}
                    </div>
                );
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