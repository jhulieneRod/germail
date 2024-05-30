export function getRowsCount(state, makeTable, instance) {
    let recordsInfoText = "";

    const { filtered, pageRows, pageSize, sortedData, page } = state;

    if (sortedData && sortedData.length > 0) {
        let isFiltered = filtered.length > 0;
        let totalRecords = sortedData.length;
        
        let recordsCountFrom = page * pageSize + 1;
        let recordsCountTo = recordsCountFrom + pageRows.length - 1;

        if (isFiltered)
            recordsInfoText = `${recordsCountFrom}-${recordsCountTo} de ${totalRecords} registro(s) filtrados`;
        else
            recordsInfoText = `${recordsCountFrom}-${recordsCountTo} de ${totalRecords} registro(s)`;
            
    } else recordsInfoText = "Nenhum registro";

    return (
        <>
            <div className='ml-auto' style={{display: 'inline-block', alignSelf: 'flex-end' }}>
                <b className="records-info" style={{ paddingRight: '2px'}}>{recordsInfoText}</b>
            </div>

            {/* {makeTable()} */}
        </>
    );
}