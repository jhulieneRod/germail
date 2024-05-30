import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { init } from './authActions';
import { Modal } from 'react-bootstrap';
import AlterarSenhaForm from './alterarSenhaForm';

const AlterarSenha = props => {

    useEffect(() => {
        props.init();
    }, [])

    function hideSenha() {
        props.init();
        props.onHide();
    }

    return (
        <Modal
            show={props.show}
            onHide={hideSenha}
            size={'lg'}// sm lg xl
            centered
        >
            <Modal.Header className='modal-header' closeButton>
                <Modal.Title>Alterar Senha</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>
                <AlterarSenhaForm onHide={hideSenha} />
            </Modal.Body>
        </Modal>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);
export default connect(null, mapDispatchToProps)(AlterarSenha);