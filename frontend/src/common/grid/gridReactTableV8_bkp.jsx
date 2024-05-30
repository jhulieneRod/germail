import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import Button from '../form/button';
import SPButton from '../form/spButton';

import If from '../operator/if';
import './gridV8.css';
import { msgWarning } from '../msg/msg';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    SortingState,
    PaginationState,
    useReactTable,
} from '@tanstack/react-table';



const columnHelper = createColumnHelper();
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function ReactTableV8(props) {

    // monta uma nova lista de colunas no padrão 'createColumnHelper'. Com isso não é necessário usar o padrão em cada arquivo list.
    const columnsListAux = props.columns.map(col => {
        // isso define o tipo de campo de todos para text, se quiser outro tipo pode colocar nas configs da coluna
        // ex: sortingFn : 'datetime'
        // documentação: https://tanstack.com/table/v8/docs/api/features/sorting#sorting-functions
        col.sortingFn = (col.sortingFn) ? col.sortingFn : 'text';

        return columnHelper.accessor((col.accessor) ? col.accessor : col.accessorKey, col)

    });

    let columnsList = columnsListAux.filter(col => {
        return (col.isVisible !== undefined) ? col.isVisible : true;
    });

    const [data, setData] = useState(() => [...props.data]); // array no hooks são alterados via função
    const [loading, setLoading] = useState(props.loading); // array no hooks são alterados via função
    const [columns, setColumns] = useState(() => [...columnsList]);
    const [columnResizeMode, setColumnResizeMode] = useState('onChange');
    const [sorting, setSorting] = useState([]);
    const [countGT, setCountGT] = useState(0);    

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        columnResizeMode,
        getCoreRowModel: getCoreRowModel(),

        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const awaitRender = async () => {
        await sleep(4000);
    }    

    useEffect(() => {
        setData(props.data);
        setLoading(props.loading);
    }, [props])    

    // useEffect(() => {
    //     console.log('data', data);
    // }, [data])

    // similar ao componentDidMount pois passa [] como parametro, se não passar ele fica igual ao componentDidUpdate
    useEffect(() => {
        table.setPageSize(Number(props.pageSize ? props.pageSize : 15));
        awaitRender()// tem que esperar se não começa alterar antes de terminar de renderizar
            .then(result => {
                /* ------------------------------------------------------ */
                // Essa rotina percorre todas as colunas para pegar o tamanho e atualizar o size das coluas que tem tamanho automático ( size : null)
                // Isso é necessário para que o Resize das coluas funcione corretamente
                let tabela = window.$('#' + props.id);
                let th = tabela.find('thead').find('tr[role="tr_header"]').find('th');

                for (let i = 0; i < th.length; i++) {
                    const element = th[i];
                    if ((columnsList[i]) && (columnsList[i].hasOwnProperty('size')))
                        columnsList[i]['size'] = window.$('#' + element.id).outerWidth();
                }
                setColumns(columnsList);
            })
    }, []);

    function getColumnStyle(cell) {
        // Utilizado para criar as colunas com os tamanhos corretos ocupando todo o espaço da tabela.
        // Tambem é responsável por fazer o resize funcionar.
        // o mesmo se repete no TD
        const size = cell.getSize();
        const stWidth = (size !== 150) ? size : 100;
        const stFlex = (cell.columnDef.size !== 150) ? `${stWidth} 0 auto` : '100 0 auto';

        let colStyle = {
            flex: stFlex,
            width: stWidth,
            maxWidth: 999999
        }

        if (cell.columnDef.size !== 150) {
            colStyle.maxWidth = stWidth;
        }

        return colStyle;
    }

    return (
        <div className='p-2 h-100'>
            <BtnAdd table={table} props={props} />

            <table id={props.id} className='table_react table-striped'>
                <If condicao={(props.showPagination === undefined) ? true : props.showPagination}>
                    <Pagination table={table} props={props} loading={loading} />
                </If>
                <thead className='thead'>
                    {/* aqui deve ser definido todas as propriedades possíveis para o cabeçalho, depois tudo é configurado em cada tela */}
                    {table.getHeaderGroups().map(headerGroup => {                        
                        return (
                            [ // foi usado array para não precisar criar uma key para o <></>
                                <tr key={headerGroup.id + '_tr'} className='tr' role="tr_header">
                                    {headerGroup.headers.map(header => {
                                        const headerClassName = (header.column.columnDef.headerClassName) ? header.column.columnDef.headerClassName : '';
                                        const sticky = ['id', 'nome'];
                                        let stylegt= sticky.includes(header.id) ? { left:  header.getStart('left'), position: 'sticky', top: 0 } : {}
                                        return (
                                            <th
                                                {...{
                                                    key: header.id,
                                                    id: props.id + '_' + header.id,
                                                    className: `th ${headerClassName}`,
                                                    colSpan: header.colSpan,
                                                    style: stylegt//getColumnStyle(header.column),                                                    
                                                }}                                                
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : (
                                                        <>
                                                            <div
                                                                {...{
                                                                    className: header.column.getCanSort()
                                                                        ? 'cursor-pointer select-none'
                                                                        : '',
                                                                    onClick: header.column.getToggleSortingHandler(),
                                                                }}
                                                            >
                                                                {flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                <div
                                                    {...{
                                                        onMouseDown: header.getResizeHandler(),
                                                        onTouchStart: header.getResizeHandler(),
                                                        className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''
                                                            }`,
                                                        style: {
                                                            transform:
                                                                columnResizeMode === 'onEnd' &&
                                                                    header.column.getIsResizing()
                                                                    ? `translateX(${table.getState().columnSizingInfo.deltaOffset
                                                                    }px)`
                                                                    : '',
                                                        },
                                                    }}
                                                />
                                            </th>
                                        )
                                    })}
                                </tr>
                                ,

                                // <If condicao={(props.showFilter === undefined) ? true : props.showFilter}>
                                //     <tr key={headerGroup.id + '_filter'} className='tr'>
                                //         {headerGroup.headers.map(header => {
                                //             const headerClassName = (header.column.columnDef.headerClassName) ? header.column.columnDef.headerClassName : '';

                                //             return (
                                //                 <th
                                //                     {...{
                                //                         key: header.id + '_filter',
                                //                         id: props.id + '_' + header.id,
                                //                         className: `th ${headerClassName}`,
                                //                         style: getColumnStyle(header.column),
                                //                     }}
                                //                 >
                                //                     {header.isPlaceholder
                                //                         ? null
                                //                         : (
                                //                             <div
                                //                             >
                                //                                 {header.column.getCanFilter() ? (
                                //                                     <div>
                                //                                         {
                                //                                             <Filter column={header.column} />
                                //                                         }
                                //                                     </div>
                                //                                 ) : null}
                                //                             </div>
                                //                         )}
                                //                 </th>
                                //             )
                                //         })}
                                //     </tr>
                                // </If>
                                // ,
                                <If condicao={(props.showFilter === undefined) ? true : props.showFilter} key='condicaoFilter' >
                                    <tr key={headerGroup.id + '_filter'} className='tr'>
                                        {headerGroup.headers.map(header => {
                                            const headerClassName = (header.column.columnDef.headerClassName) ? header.column.columnDef.headerClassName : '';
                                            return (
                                                <th
                                                    {...{
                                                        key: header.id + '_filter',
                                                        id: props.id + '_' + header.id,
                                                        className: `th ${headerClassName}`,
                                                        style: getColumnStyle(header.column),
                                                    }}
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : (
                                                            <div
                                                            >
                                                                {header.column.getCanFilter() ? (
                                                                    <div>
                                                                        {
                                                                            <Filter column={header.column} />
                                                                        }
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        )}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </If>
                            ]
                        )
                    })}
                </thead>
                <tbody className='tbody'>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}
                            className={(props.onClick) ? 'tr tr_select' : 'tr'}
                            onClick={() => (props.onClick) ? props.onClick(row.original) : null}
                        // className={(props.onDoubleClick) ? 'tr tr_select' : 'tr'}
                        // onClick={() => (props.onDoubleClick) ? props.onDoubleClick(row.original) : null}
                        >
                            {row.getVisibleCells().map((cell, idx) => {
                                const colClassName = (cell.column.columnDef.className) ? cell.column.columnDef.className : '';
                                return (
                                    <td
                                        {...{
                                            key: cell.id,
                                            className: `td ${colClassName}`,
                                            style: getColumnStyle(cell.column, idx)
                                        }}
                                    >

                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}

                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
                {loading ? <div className='p-2' >Aguarde, carregando...</div> : null}
            </table>
        </div>
    )
}

// cria a parte do filtro
function Filter({ column }) {

    const columnFilterValue = column.getFilterValue();
    const dataFilterFn = column.columnDef.gtFilterFn;

    return (dataFilterFn) ? dataFilterFn({ column: column }) : (
        <input
            type='text'
            className='border rounded p-1 input_filter'
            value={(columnFilterValue ?? '')}// ?? -> Sua funcionalidade é retornar o primeiro operando se ele existir e não for nulo do contrário retorna o segundo
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Filtrar...`}
        />
    )

    // return typeof firstValue === 'number' ? (
    //     <input
    //         type='number'
    //         value={(columnFilterValue ?? '')}// ?? -> Sua funcionalidade é retornar o primeiro operando se ele existir e não for nulo do contrário retorna o segundo
    //         onChange={e => column.setFilterValue(e.target.value)}
    //         placeholder={`Filtrar...`}
    //         className='border rounded p-1 input_filter'
    //     />
    // ) : (
    //     <input
    //         type='text'
    //         className='border rounded p-1 input_filter'
    //         value={(columnFilterValue ?? '')}// ?? -> Sua funcionalidade é retornar o primeiro operando se ele existir e não for nulo do contrário retorna o segundo
    //         onChange={e => column.setFilterValue(e.target.value)}
    //         placeholder={`Filtrar...`}
    //     />
    // )
}

function BtnRefresh({ btnAtualizar, updateListFn }) {
    return (
        <If condicao={(btnAtualizar === undefined) ? true : btnAtualizar}>
            {/* <Button type='button' className={`info button_Refresh`} icon='sync-alt' label={isMobile ? '' : 'Atualizar'} onClick={updateListFn} /> */}
            <SPButton
                className={`btn btn-light button-size pagination_button text-primary`}
                // icon='sync-alt' 
                icon='arrows-rotate'
                data-title='Atualizar'
                // label={isMobile ? '' : 'Atualizar'} 
                onClick={updateListFn}
            />
        </If>
    )
}

function BtnAdd({ table, props }) {
    return (
        <If condicao={(props.showBtnAdd === undefined) ? false : props.showBtnAdd}>
            <Button type='button' className='success ml-0 mb-1' icon='plus' label='Adicionar' style={{ display: 'inline-block' }} onClick={props.addLineGridFn} />
            <If condicao={props.showPagination === false}>
                <RowsCount table={table} />
            </If>
        </If >
    )
}

function RowsCount({ table, loading }) {
    let recordsInfoText = '';

    const pagination = table.getState().pagination;
    const filteredRow = table.getFilteredRowModel();
    const paginationRow = table.getPaginationRowModel();

    // console.log('table', table);
    // console.log('filteredRow.rows', filteredRow.rows);

    if (filteredRow.rows.length > 0) {

        let totalRecords = filteredRow.rows.length;
        let recordsCountFrom = pagination.pageIndex * pagination.pageSize + 1;
        let recordsCountTo = recordsCountFrom + paginationRow.rows.length - 1;

        recordsInfoText = `${recordsCountFrom}-${recordsCountTo} de ${totalRecords} registro(s)`;
    } else recordsInfoText = (loading) ? 'Carregando...' : 'Nenhum registro';

    return (
        <div className='float-right' style={{ display: 'inline-block', paddingTop: '3px', paddingRight: '2px' }}>
            {recordsInfoText}
        </div>
    )

}

// cria a parte da paginação
function Pagination({ table, props, loading }) {
    // console.log('table.getState()', table.getState());
    return (
        <div className='pagination'>
            <SPButton
                className='btn btn-light button-size ml-0 pagination_button text-primary'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                // data-title='Primeira'
                icon='angles-left'
            />
            <SPButton
                className='btn btn-light button-size pagination_button text-primary'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                // data-title='Anterior'
                icon='angle-left'
            />
            {/* <i className="fa-solid fa-angle-left"></i>
            </button> */}
            {' '}


            <span>Pág{' '}
                <input
                    type='number'
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 1;
                        const pageGT = (page < 1) ? 0 : (page >= table.getPageCount()) ? table.getPageCount() - 1 : page;

                        table.setPageIndex(pageGT);
                    }}
                    className='border rounded p-1'
                    style={{
                        height: '26px',
                        width: '50px'
                    }}
                /> de{' '}
                {table.getPageCount()}
            </span>

            <SPButton
                className='btn btn-light button-size pagination_button text-primary'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                // data-title='Próxima'
                icon='angle-right'
            />
            {/* <i className="fa-solid fa-angle-right"></i>
            </button> */}
            <SPButton
                className='btn btn-light button-size pagination_button text-primary'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                // data-title='Última'
                icon='angles-right'
            />

            <If condicao={!isMobile}>
                {' '}
                <select
                    className='border rounded p-1'
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 15, 20, 25, 50, 100, 150, 200, 500].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize} Linhas
                        </option>
                    ))}
                </select>
            </If>
            <BtnRefresh btnAtualizar={props.btnAtualizar} updateListFn={props.updateListFn} />
            <RowsCount table={table} loading />
            {/* {loading ? 'Loading...' : null} */}
        </div>
    )
}

export default ReactTableV8;