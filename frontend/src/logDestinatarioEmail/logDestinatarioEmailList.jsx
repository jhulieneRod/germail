import React, { useState, useEffect } from 'react';
import { getList } from './logDestinatarioEmailActions'
import ModalQuery from '../common/modal/modalQuery';

const LogDestinatarioEmailList = (props) => {

   const [dataList, setDataList] = useState(props.list || []);
   const [tipo] = useState(props.tipo ?? 0);

    useEffect(() => {
        getList(tipo, setDataList);
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
            accessorKey: 'lead',
            id: 'lead',
            header: 'Lead - Código',
            size: 100,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'destinatario_nome',
            id: 'destinatario_nome',
            header: 'Lead - Nome',
            minSize: 50,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'destinatario_email',
            id: 'destinatario_email',
            header: 'Lead - E-mail',
            minSize: 50,
            headerClassName: 'header_left',
        },
        {
            accessorKey: 'acao',
            id: 'acao',
            header: 'Ação',
            minSize: 50,
            headerClassName: 'header_left',
            isVisible: false
        },
    ]

    return (
        <ModalQuery
            columns={columnsV8}
            data={dataList}
            loading={false}
            show={props.show}
            onHide={props.onHide}
            title={props.title ?? 'Consulta E-mail'}
        />
    )
}

export default LogDestinatarioEmailList;