import { getRowsCount } from './gridReactTableClassAction';
import React, { Component } from 'react'
import ReactTable from 'react-table-7'
import Button from '../form/button';
import SPButton from '../form/spButton';
import { isMobile } from 'react-device-detect';
import If from '../operator/if';
// import 'react-table-7/react-table.css'
import './grid.css';

function filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;

    if ((row[id] !== undefined) && (isNaN(row[id]))) {
        return String(row[id].toLowerCase()).indexOf(filter.value.toLowerCase()) >= 0;
    }
    return String(row[id]).startsWith(filter.value);
}

class ReactTableGT2AClass extends Component {
    // constructor(props) {
    //     super(props);

    //     // this.getRowsCount = this.getRowsCount.bind(this);        

    // }                                   
    // FOI SEPARADO E COLOCADO NO ARQUIVO "gridReactTableClassAction.js" PARA PODER SER USADO COMO children DIRETO NA TELA E NÃO NO COMPONENTE(ISSO PERMITE FAZER O BOTÃO PARA IMPRIMIR O GRID EM PDF)
    // getRowsCount(state, makeTable, instance) {    
    // }

    render() {
        return (
            <>
                {/* Exemplo de como fazer um total de registros: */}
                {/* https://codesandbox.io/s/vj7yk35370?file=/index.js:2555-2564 */}
                {/* <If condicao={!this.props.btnAtualizarHide}>
                    <Button type='button' className={`btn btn-info button_Refresh`} icon='sync-alt' label={isMobile ? '' : 'Atualizar'} onClick={this.props.updateList} />
                </If> */}
                <ReactTable
                    {...this.props}
                    // ref={this.props.ref}                
                    page={this.props.page}
                    loading={this.props.loading}
                    style={this.props.style}
                    showPageSizeOptions={true}
                    pageSizeOptions={(this.props.pageSizeOptions) ? this.props.pageSizeOptions : [10, 15, 20, 25, 50, 100, 150, 200, 500]}
                    defaultPageSize={(this.props.defaultPageSize) ? this.props.defaultPageSize : (isMobile) ? 10 : 15}
                    showPageJump={true}
                    showPaginationBottom={this.props.showPaginationBottom}
                    showPagination={this.props.showPagination}
                    filterable={false}

                    defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row)}

                    previousText={(isMobile) ? <i className='fa fa-reply'></i> : <div><i className='fa fa-reply'></i> <span>Anterior</span></div>}
                    nextText={(isMobile) ? <i className='fa fa-share'></i> : <div><i className='fa fa-share'></i> <span>Próximo</span></div>}
                    loadingText='Carregando...'
                    noDataText={this.props.loading ? '' : 'Nenhum registro'}
                    pageText={(isMobile) ? 'Pág' : 'Página'}
                    ofText='de'
                    rowsText='linhas'
                    sortable={(this.props.sortable === undefined) ? true : (this.props.sortable)}
                    resizable={(this.props.resizable === undefined) ? true : (this.props.resizable)}
                // getTrProps={(state, rowInfo, column) => ({
                //     style: {
                //       height: '40px',
                //       paddingTop: '5px'
                //     },
                // })}
                // pageJumpText='jump to page'
                // rowsSelectorText='rows per page'

                // NextComponent ={this.getNextComponent}
                >
                    {(state, makeTable, instance) => {
                        const btnRefresh =
                            <If condicao={!this.props.btnAtualizarHide}>
                                <Button type='button' className={`info button_Refresh`} icon='sync-alt' label={isMobile ? '' : 'Atualizar'} onClick={this.props.updateList} />
                            </If>

                        const btnSmRefresh =
                            <If condicao={(this.props.btnAtualizarSm === undefined) ? false : this.props.btnAtualizarSm}>
                                {/* <Button type='button' className={`info button_sm_Refresh`} icon='sync-alt' data-title='Atualizar' onClick={this.props.updateList} /> */}
                                <SPButton type='button' className='info button_sm_Refresh' icon='sync-alt' data-title='Atualizar' onClick={this.props.updateList} />
                            </If>

                        const btnAdd =
                            <If condicao={this.props.btnAddShow}>
                                <Button type='button' className='success m-1' icon='plus' label='Adicionar' style={{ display: 'inline-block' }} onClick={this.props.addLineGrid} />
                            </If>

                        const btnPrint =
                            <If condicao={(this.props.btnPrintShow === undefined) ? false : this.props.btnPrintShow}>
                                <Button type='button' className={`btn btn-success button_Refresh`} style={isMobile ? { marginRight: '40px' } : { marginRight: '100px' }} icon='print' label={isMobile ? '' : 'Imprimir'} onClick={() => this.props.printReportGrid(state.sortedData, state.columns)} />
                            </If>                        

                        if (this.props.children)
                            return (
                                <>
                                    {btnPrint}
                                    {btnRefresh}
                                    <span style={{ display: 'flex' }}>
                                        {btnAdd}
                                        {this.props.children(state, makeTable, instance)}
                                    </span>
                                    {/* {makeTable()} */}
                                </>
                            )
                        else
                            return (
                                <>
                                    {btnPrint}
                                    {btnRefresh}
                                    <span style={{ display: 'flex' }}>
                                        {btnAdd}
                                        {(!this.props.rowCountHide) ? getRowsCount(state, makeTable, instance) : <></>}
                                        {btnSmRefresh}
                                    </span>
                                    {makeTable()}
                                </>
                            )
                    }}
                </ReactTable>
            </>
        )
    }
}

export default ReactTableGT2AClass;