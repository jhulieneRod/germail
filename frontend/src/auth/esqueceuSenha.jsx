import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { init } from './authActions';
import { Modal } from 'react-bootstrap';
import EsqueceuSenhaForm from './esqueceuSenhaForm';

class EsqueceuSenha extends Component {

    constructor(props) {
        super(props);

        this.props.init();

        this.hideSenha = this.hideSenha.bind(this);

        this.state = {
            show: false
        };
    }
    hideSenha(){
        this.props.init();
        this.props.onHide();
    }

    render() {

        return (
            <Modal show={this.props.show} onHide={this.hideSenha} dialogClassName='modal_search'>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>Recuperar senha</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                        <EsqueceuSenhaForm onHide={this.hideSenha}/>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);
export default connect(null, mapDispatchToProps)(EsqueceuSenha);