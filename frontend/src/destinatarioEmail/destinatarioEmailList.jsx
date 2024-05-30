import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create, remove, update, getList } from './destinatarioEmailActions'
import { init } from '../email/emailActions';
import SPButton from '../common/form/spButton';
import { msgQuestion } from '../common/msg/msg';
import ReactTableV8 from '../common/grid/gridReactTableV8';
import { CardBodyScroll, CardBodyTable, CardFooter } from '../common/layout/card';
import IF from '../common/operator/if';
import { Button } from 'react-bootstrap';
import TagListSearch from '../tag/tagListSearch';

const DestinatarioEmailList = (props) => {

   const [dataList, setDataList] = useState(props.list || []);
   const [show, setShow] = useState(false);

    useEffect(() => {
        setDataList(props.list);
    }, [props.list])

    function removerDestinatarioEmail(data) {
        msgQuestion('Deseja realmente excluir?')
            .then((result) => {
                if (result.value) {
                    props.remove(data);
                }
            });
    }

    const adicionaDestinatario = (tag) => {
        setShow(false);
        let value = {
            id_tag: tag.id,
            id_email: props.email
        }

        props.create(value);
    };

    const columnsV8 = [
        {
            accessorKey: '',
            id: 'button_grid',
            cell: ({ row }) => {
                return (
                    <div>
                        <IF condicao={row.original.id === null}>
                            <SPButton type='button' className='warning btn-sm' icon='add' data-title='Novo' onClick={() => setShow(true)} />
                        </IF>
                        <IF condicao={row.original.id !== null}>
                            <SPButton type='button' className='danger btn-sm' icon='trash' data-title='Excluir' onClick={() => removerDestinatarioEmail(row.original)} />
                            <SPButton type='button' className='info btn-sm' icon={(row.original.status === 0) ? 'user-plus' : 'user-minus'} data-title={(row.original.status === 0) ? 'Ativar' : 'Desativar'} onClick={() => props.update({id: row.original.id, status: !row.original.status, id_email: props.email})} />
                        </IF>
                    </div>
                )
            },
            minSize: 120,
            size: 120,
            className: 'column_icon',
        },
        {
            accessorKey: 'id_email',
            id: 'id_email',
            header: 'Código Email',
            minSize: 70,
            size: 70,
            isVisible: false
        },
        {
            accessorKey: 'id',
            id: 'id',
            header: 'Código',
            minSize: 70,
            size: 70,
            isVisible: false
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
            accessorKey: 'status_descricao',
            id: 'status_descricao',
            header: 'Status',
            minSize: 50,
            headerClassName: 'header_left',
        }
    ]

    return (
        <>
        <CardBodyScroll>
            <TagListSearch
                title={'Tags'}
                show={show}
                onHide={() => setShow(false)}
                onSelect={adicionaDestinatario}
            />
            <ReactTableV8
                id='tagList'
                data={dataList}
                columns={columnsV8}
                updateListFn={() => props.getList(props.email)}
            />
        </CardBodyScroll>
        <CardFooter>
            <Button type='button' className='secondary' icon='times' label='Voltar' onClick={() => props.init(false)}>Voltar</Button>
        </CardFooter>
        </>
    )
}
const mapStateToProps = state => ({ 
    list: state.destinatarioEmailCad.list,
    stateReq: state.destinatarioEmailCad.stateReq 
})
const mapDispatchToProps = dispatch => bindActionCreators({ create, update, remove, getList, init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DestinatarioEmailList)