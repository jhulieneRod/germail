import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { getLogsAvisos } from './logsActions';
import { columnId, columnDate } from '../common/grid/conlumnsConfig';
import ModalQuery from '../common/modal/modalQuery';

const LogsAvisos = (props) => {

    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);

    // zera a lista e exibe o "aguarde, carregando"
    useEffect(() => {        
        setDataList([]);
        setLoading(true);
    }, [props.show])

    useEffect(() => {
        setDataList(props.list);
        setLoading(props.stateReq === 0);
    }, [props.list])

    const columnsV8 = [
        {
            ...columnDate,
            accessorKey: 'data_log',
            id: 'data_log',
            header: 'Data Envio'
        },
        {
            ...columnId,
            accessorKey: 'empresa',
            id: 'empresa',
            header: 'Empresa'
        },
        {
            accessorKey: 'filial',
            id: 'filial',
            header: 'Filial',
            minSize: 60,
            size: 60
        },
        {
            accessorKey: 'cliente',
            id: 'cliente',
            header: 'Nome',
            minSize: 280,
            headerClassName: 'header_left',
        },
        {
            ...columnId,
            accessorKey: 'codigo_funcionario',
            id: 'codigo_funcionario',
            header: 'Cód. Func',
            minSize: 75,
            size: 75,
            isVisible: props['data-tipo'] !== 5
        },
        {
            accessorKey: 'funcionario',
            id: 'funcionario',
            header: 'Funcionário',
            minSize: 280,
            headerClassName: 'header_left',
            isVisible: props['data-tipo'] !== 5
        },
        {
            accessorKey: 'email',
            id: 'email',
            header: 'Email Cliente',
            minSize: 250,
            headerClassName: 'header_left',
        },
    ]

    return (
        <ModalQuery
            columns={columnsV8}
            data={dataList}
            loading={loading}
            show={props.show}
            onHide={() => {
                setDataList([]);
                setLoading(true);
                props.onHide();
            }}
            title={props.title}
        />

    )
}
const mapStateToProps = state => ({ list: state.logsCad.logsAviso, stateReq: state.logsCad.stateReq })
// const mapDispatchToProps = dispatch => bindActionCreators({ getLogsAvisos }, dispatch)
export default connect(mapStateToProps, null)(LogsAvisos)