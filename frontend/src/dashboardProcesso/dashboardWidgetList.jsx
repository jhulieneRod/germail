import React, { useState, useEffect } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { columnId} from '../common/grid/conlumnsConfig';
import SPButton from '../common/form/spButton';
import ModalQuery from '../common/modal/modalQuery';

const DashboardWidgetsList = (props) => {

    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        setDataList([]);
    }, [props.show])

    useEffect(() => {
        setDataList(props.list);
    }, [props.list])

    const columnsV8 = [        
        {
            ...columnId,
            accessorKey: 'codigo_sistema',
            id: 'codigo_sistema',
            header: 'Código',
            className: 'column_grid column_right'
        },
        {
            ...columnId,
            accessorKey: 'codigo_questor_empresa',
            id: 'codigo_questor_empresa',
            header: 'ERP. Emp.'
        },
        {
            accessorKey: 'codigo_questor_filial',
            id: 'codigo_questor_filial',
            header: 'Filial',
            minSize: 50,
            size: 50
        },
        {
            accessorKey: 'nome_empresa',
            id: 'nome_empresa',
            header: 'Nome',
            minSize: 540,
            // size: 540,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'total',
            id: 'total',
            header: 'Total',
            minSize: 50,
            size: 50,
            headerClassName: 'header_left',
        },
        {
            accessorKey: '',
            id: 'button_grid_download',
            cell: ({ row }) => (
                <div>
                    <SPButton type='button' className='success btn-sm' icon='download' data-title={`Exportar ${props.title}`}/>                    
                </div>
            ),
            minSize: 41,
            size: 41,
            className: 'column_icon',
            isVisible : props.btnExport
        }        
    ]

    return (
        <ModalQuery
            columns={columnsV8}
            data={dataList}
            loading={props.stateReq != 200}
            show={props.show}
            onHide={props.onHide}
            title={`Consulta "${props.title}" para exportação`}
        />
    )
}
const mapStateToProps = state => ({ list: state.dashboard.widgetPesquisar, stateReq: state.dashboard.stateReq })
// const mapDispatchToProps = dispatch => bindActionCreators({ getLogsAvisos }, dispatch)
export default connect(mapStateToProps, null)(DashboardWidgetsList)