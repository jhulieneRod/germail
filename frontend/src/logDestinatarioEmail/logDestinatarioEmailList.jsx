import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getList } from './logDestinatarioEmailActions'
import ReactTableV8 from '../common/grid/gridReactTableV8';
import { CardBodyTable } from '../common/layout/card';

const LogDestinatarioEmailList = (props) => {

   const [dataList, setDataList] = useState(props.list || []);

    useEffect(() => {
        setDataList(props.list);
    }, [props.list])

    useEffect(() => {
        props.getList();
    }, [])

    const columnsV8 = [
        {
            accessorKey: 'email',
            id: 'email',
            header: 'E-mail',
            minSize: 50,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'destinatario',
            id: 'destinatario',
            header: 'Destinatário',
            minSize: 50,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'acao',
            id: 'acao',
            header: 'Ação',
            minSize: 50,
            headerClassName: 'header_left',
        },
    ]

    return (
        <CardBodyTable>
            <ReactTableV8
                id='logDestinatarioEmailList'
                data={dataList}
                columns={columnsV8}
                updateListFn={props.getList}
                showPagination={false}
                showFilter={false}
            />
        </CardBodyTable>
    )
}
const mapStateToProps = state => ({ 
    list: state.logDestinatarioEmailCad.list,
    stateReq: state.logDestinatarioEmailCad.stateReq 
})
const mapDispatchToProps = dispatch => bindActionCreators({ getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(LogDestinatarioEmailList)