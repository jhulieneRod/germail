import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, getFormValues } from 'redux-form';

import { init, update, getList } from './configuracaoActions';

import LabelAndInput from '../common/form/labelAndInput';
import LabelAndSelectForm from '../common/form/labelAndSelectForm';
import Button from '../common/form/button';
import { msgWarning } from '../common/msg/msg';
import { CardBodyScroll, CardFooter } from '../common/layout/card';

let ConfiguracaoForm = (props) => {

    const [campos, setCampos] = useState([]);

    useEffect(() => {
        if(props.tipo){
            props.getList(props.tipo);
        }
    }, [props.tipo]);

    useEffect(() => {
        if(props.list){
            setCampos(props.list);
        }
    }, [props.list]);

    useEffect(() => {
        if(campos.length){
            campos.map((campo) => {
                props.change(`${campo.id}_${campo.campo}`, campo.valor);
            });
        }
    },[campos]);

    return (
        <form name={props.name}>
            <CardBodyScroll>
                { campos.map((campo) => {
                    return <Field
                        key={campo.id}
                        name={`${campo.id}_${campo.campo}`}
                        component={LabelAndInput}
                        label={campo.campo}
                        cols='12'
                    />
                })
                }

            </CardBodyScroll>
            <CardFooter>
                <Button type='button' className={props.submitClass} icon='check' label={props.submitLabel} onClick={() => props.update(props.formValue)} />
                <Button type='button' className='secondary' icon='times' label='Cancelar' onClick={() => { props.init() }} />
            </CardFooter>
        </form>
    )
}

ConfiguracaoForm = reduxForm({ form: 'configuracaoForm', destroyOnUnmount: false, })(ConfiguracaoForm);

const mapStateToProps = state => ({
    formValue: getFormValues('configuracaoForm')(state),
    list: state.configuracaoCad.list,
});

const mapDispatchToProps = dispatch => bindActionCreators({ init, update, getList }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ConfiguracaoForm);