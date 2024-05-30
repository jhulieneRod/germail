import { parseISO, format, isValid } from 'date-fns';
import { dateFilter } from '../useful/useful';

export const columnId = {
    size: 80,
    minSize: 80,
    className: 'column_grid column_right',
    sortingFn: 'alphanumeric'
    // Filter: () => <div className='rt-th'><span >Filtrar</span></div>
}

export const columnDate = {
    size: 110,
    minSize: 110,
    headerClassName: 'header_left',
    className: 'column_grid column_center',
    sortingFn: 'datetime',
    cell: props => {
        // console.log(props.getValue());
        // console.log(format(parseISO(props.getValue()), 'dd/MM/yyyy'));
        let value = props.getValue();
        // console.log(value);
        return <span>{isValid(parseISO(value)) ? format(parseISO(value), 'dd/MM/yyyy') : value}</span>        
    }
}

export const columnDateFilter = {
    ...columnDate,
    // filterable: true,
    filterMethod: (filter, row) => {
        return dateFilter(filter, row)
    }
}

export const columnYesNo = {
    size: 90,
    minSize: 90,
    // filterable: false,
    className: 'column_grid column_center',
    accessor: (row) => (parseInt(row.x_ativo) === 1 ? 'Sim' : 'Não'),
    gtFilterFn: ({ column }) => {
        const columnFilterValue = column.getFilterValue();
        return (
            <select
                onChange={e => column.setFilterValue(e.target.value)}
                className='border rounded p-1 input_filter'
                value={(columnFilterValue ?? '')}
            >
                <option value=''>Todos</option>
                <option value='Sim'>Sim</option>
                <option value='Não'>Não</option>
            </select>
        )
    }
}