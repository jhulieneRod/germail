import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactTableV8 from '../grid/gridReactTableV8';
import Button from '../form/button';
import Row from '../layout/row';
import If from '../operator/if';
// import { CardBodyScroll } from '../layout/card';

const ModalQuery = props => {

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            dialogClassName='modal_search'
            // size={'xl'}
            // onFocus={(e) => {// utilizado para ficar com o campo código focado e agilizar a digitação para pesquisa.
            //     let inputFilterList = e.target.getElementsByTagName("input");

            //     if (inputFilterList[0])
            //         inputFilterList[0].focus();
            // }}            
            centered
        >
            <Modal.Header className='modal-header' closeButton>
                {/* <Modal.Header className='modal-header' style={{backgroundColor:'rgb(255, 99, 132)', color:'#fff'}} closeButton> */}

                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body className='modal-body'>
                <div
                    className={`card-body pb-0 pt-0 pl-1 pr-2 overflow-auto`}
                    style={{ height: 533 }}
                >
                    <Row>
                        <ReactTableV8
                            id='clienteList'
                            data={props.data}
                            loading={props.loading}
                            columns={props.columns}
                            updateListFn={props.getList}
                        />
                    </Row>
                </div>
                {/* <CardBodyScroll className='p-1' height={566}>
                    
                </CardBodyScroll> */}
            </Modal.Body>

            <If condicao={props.footer}>
                <Modal.Footer className='modal-header'>
                    <Button type='button' className='default' icon='close' label='Cancelar' onClick={props.onHide} />
                </Modal.Footer>
            </If>
        </Modal>
    )
}

export default ModalQuery;