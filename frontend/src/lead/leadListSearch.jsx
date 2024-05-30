import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getList } from './leadActions';
import { columnId } from '../common/grid/conlumnsConfig';
import ReactTableV8 from '../common/grid/gridReactTableV8';
import { Modal } from 'react-bootstrap';
import Button from '../common/form/button';

class LeadListSearch extends Component {

    constructor(props) {
        super(props);

        this.props.getList();

        this.state = {
            show: false
        };
    }

    render() {

        const destinatarios = this.props.list || [];

        const columns = [
            {
                ...columnId,
                accessorKey: 'id',
                id: 'id',
                header: 'Código'
            },
            {
                accessorKey: 'nome',
                id: 'nome',
                header: 'Nome',
                minSize: 150,
                headerClassName: 'header_left',
            },
            {
                accessorKey: 'email',
                id: 'email',
                header: 'E-mail',
                minSize: 150,
                headerClassName: 'header_left',
            },
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
                        <Modal.Title>{(this.props.title) ? this.props.title : 'Destinatários'}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className='modal-body'>
                        <ReactTableV8
                            id='leadList'
                            data={destinatarios}
                            columns={columns}
                            updateListFn={this.props.getList}
                            onClick = {this.props.onSelect}
                        />                        
                    </Modal.Body>

                    <Modal.Footer className='modal-header'>
                        <Button type='button' className='default' icon='close' label='Cancelar' onClick={this.props.onHide} />
                    </Modal.Footer>
                </Modal>
            )

    }
}
const mapStateToProps = state => ({ list: state.leadCad.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(LeadListSearch)
