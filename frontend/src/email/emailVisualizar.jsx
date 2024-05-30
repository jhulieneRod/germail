import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getConteudoEmail } from './emailActions'
import { CardBodyScroll, CardBodyTable } from '../common/layout/card';

const EmailVisualizar = (props) => {

   const [conteudo, setConteudo] = useState('');

    useEffect(() => {
        if(props.email !== ''){
            getConteudoEmail(props.email, setConteudo);
        }
    }, [])

    return (
        <CardBodyScroll>
            {conteudo}
        </CardBodyScroll>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({ getConteudoEmail }, dispatch)
export default connect(null, mapDispatchToProps)(EmailVisualizar)