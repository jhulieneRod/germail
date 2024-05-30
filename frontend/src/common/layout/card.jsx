import React, { useState, useEffect } from 'react';
import Grid from '../layout/grid';
import Row from './row';
import useScreenSize from '../hooks/useScreenSize';

const Card = props => (
    <div className={`card mb-1 ${(props.className) ? props.className : ''}`} style={props.style} >{props.children}</div>
)

const CardHeader = props => (
    <div className={`card-header p-2 ${(props.className) ? props.className : ''}`} >
        {props.title ? (
            <div className="d-flex justify-content-between">
                <h3 className={`card-title`}>{props.title}</h3>
            </div>) : <></>
        }
        {props.children}
    </div>
)

const CardBody = props => {

    return (
        <div
            className={`card-body p-3 ${(props.className) ? props.className : ''}`}
        >

            <Row>
                {props.children}
            </Row>
        </div>
    )
}

const CardBodyScroll = props => {
    const [heightForm, setHeightForm] = useState(props.height ? props.height : 500);
    const screenSize = useScreenSize();// é alterado quando a tela é redimencionada

    useEffect(() => {
        let winHeight = screenSize.height;// window.$(window).height();
        // calculo quando os botões ficam em baixo
        // winHeight = (props.height) ? props.height : (winHeight - 187);

        // O padrão com desconto de 187 é para formularios, se precisar usar o scroll em outros lugar pode aver a necessidade de informar um valor diferente no discountHeight
        let discountHeight = (props.discountHeight > 0) ? props.discountHeight : 187;
        winHeight = (props.height) ? props.height : (winHeight - discountHeight);

        setHeightForm(props.height ? props.height : winHeight);
    }, [screenSize])

    return (
        <div
            className={`card-body pb-3 pt-3 pl-3 pr-4 overflow-auto ${(props.className) ? props.className : ''}`}
            style={{ height: heightForm }}
        >
            <Row>
                {props.children}
            </Row>
        </div>
    )
}

const CardBodyTable = props => {
    const [heightForm, setHeightForm] = useState(props.height ? props.height : 500);
    useEffect(() => {
        let winHeight = window.$(window).height();
        setHeightForm(props.height ? props.height : winHeight - 140)
    }, [])

    return (
        <div key={props.key}
            className={`card-body pb-3 pt-0 pl-2 pr-4 overflow-auto ${(props.className) ? props.className : ''}`}
            style={{ height: heightForm }}
        >
            <Row>
                {props.children}
            </Row>
        </div>
    )
}

const CardFooter = props => (
    <div className={`card-footer card_footer p-2 mt ${(props.className) ? props.className : ''}`} >{props.children}</div>
)

const CardTable = props => (

    <Grid cols='12' className={(props.gridClassName) ? props.gridClassName : ''} style={props.gridStyle ? props.gridStyle : {}} >
        <div className={`card ${(props.className) ? props.className : ''}`} style={{ border: '1px solid rgba(0,0,0,.125)' }}>
            <div className='card-header' style={{ padding: '7px 10px', backgroundColor: '#f5f5f5', position: 'static' }}>
                <h3 style={{ fontSize: '16px', margin: '0px' }}>{props.title}</h3>
            </div>
            <div className='card-body p-0'>
                {props.children}
            </div>
        </div>
    </Grid>
)

export { Card, CardHeader, CardBody, CardBodyScroll, CardBodyTable, CardFooter, CardTable };