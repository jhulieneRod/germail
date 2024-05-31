import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getList } from './tagActions';
import ReactTableV8 from '../common/grid/gridReactTableV8';
import { Modal, Row } from 'react-bootstrap';
import Button from '../common/form/button';

class TagListSearch extends Component {

    constructor(props) {
        super(props);

        this.props.getList();

        this.state = {
            show: false
        };
    }

    render() {

        const tags = this.props.list || [];

        const columns = [
            {
                accessorKey: 'id',
                id: 'id',
                header: 'Código',
                minSize: 70,
                size: 70
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
                accessorKey: 'descricao',
                id: 'descricao',
                header: 'Descrição',
                minSize: 50,
                headerClassName: 'header_left',
            }
        ];

            return (

                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    size={'lg'}
                    onFocus={(e) => {// utilizado para ficar com o campo código focado e agilizar a digitação para pesquisa.
                        let inputFilterList = e.target.getElementsByTagName("input");

                        if (inputFilterList[0])
                            inputFilterList[0].focus();
                    }}
                >
                    <Modal.Header className='modal-header' closeButton>
                        <Modal.Title>{(this.props.title) ? this.props.title : 'Tags'}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className='modal-body'>
                        <div
                            className={`card-body pb-0 pt-0 pl-1 pr-2 overflow-auto`}
                            style={{ minHeight: 533 }}
                        >
                            <Row>
                                <ReactTableV8
                                    id='tagList'
                                    data={tags}
                                    columns={columns}
                                    updateListFn={this.props.getList}
                                    onClick = {this.props.onSelect}
                                />                    
                            </Row>  
                        </div>  
                    </Modal.Body>

                    <Modal.Footer className='modal-header'>
                        <Button type='button' className='default' icon='close' label='Cancelar' onClick={this.props.onHide} />
                    </Modal.Footer>
                </Modal>
            )

    }
}
const mapStateToProps = state => ({ list: state.tagCad.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TagListSearch)
