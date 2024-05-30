import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showUpdate, remove, update, getList, enviaEmail } from './emailActions'
import { showDestinatarios } from '../destinatarioEmail/destinatarioEmailActions';
import SPButton from '../common/form/spButton';
import { msgQuestion } from '../common/msg/msg';
import ReactTableV8 from '../common/grid/gridReactTableV8';
import { CardBodyTable } from '../common/layout/card';
import IF from '../common/operator/if';

const EmailList = (props) => {

   const [dataList, setDataList] = useState(props.list || []);

    useEffect(() => {
        setDataList(props.list);
    }, [props.list])

    function removerEmail(data) {
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
                        <SPButton type='button' className='danger btn-sm' icon='trash' data-title='Excluir' onClick={() => removerEmail(row.original)} />
                        <SPButton type='button' className='info btn-sm' icon={(row.original.status === 0) ? 'check' : 'ban'} data-title={(row.original.status === 0) ? 'Ativar' : 'Desativar'} onClick={() => props.update({id: row.original.id, status: !row.original.status})} />
                        <SPButton type='button' className='success btn-sm' icon='user-group' data-title='Destinatários' onClick={() => props.onClickDestinatario(row.original.id)} />
                        <IF condicao={row.original.status !== 0}>
                            <SPButton type='button' className='info btn-sm' icon='paper-plane' data-title='Enviar' onClick={() => props.enviaEmail(row.original.id)} />
                        </IF>
                    </div>
                )
            },
            size: 200,
            className: 'column_icon',
        },
        {
            accessorKey: 'id',
            id: 'id',
            header: 'Código',
            size: 100
        },
        {
            accessorKey: 'assunto',
            id: 'assunto',
            header: 'Assunto',
            headerClassName: 'header_left',
            minSize: 300,
        },
        {
            accessorKey: 'conteudo',
            id: 'conteudo',
            header: 'E-mail',
            headerClassName: 'header_left',
            isVisible: false
        },
        {
            accessorKey: 'status_descricao',
            id: 'status_descricao',
            header: 'Status',
            minSize: 70,
            size: 70,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'automatico',
            id: 'automatico',
            header: 'Envio Automático',
            minSize: 130,
            size: 130,
            headerClassName: 'header_left',
            cell: ({ row }) => {
                return (row.original.automatico === 1 ? 'Sim' : 'Não')
            }
        }
    ]

    return (
        <CardBodyTable>
            <ReactTableV8
                id='emailList'
                data={dataList}
                columns={columnsV8}
                updateListFn={props.getList}
            />
        </CardBodyTable>
    )
}
const mapStateToProps = state => ({ 
    list: state.emailCad.list,
    stateReq: state.emailCad.stateReq 
})
const mapDispatchToProps = dispatch => bindActionCreators({ showUpdate, remove, update, getList, showDestinatarios, enviaEmail }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(EmailList)