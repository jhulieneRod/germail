import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, getFormValues } from 'redux-form';

import { init, update, getList, create } from './configuracaoActions';
import { required } from '../common/form/inputConfig';
import LabelAndInput from '../common/form/labelAndInput';
import Button from '../common/form/button';
import { CardBodyScroll, CardFooter } from '../common/layout/card';
import EmailEditor from 'react-email-editor'
import { msgWarning } from '../common/msg/msg';
const translate = require('../email/editor-translate.json');

let ConfiguracaoForm = (props) => {

    const editorRef = useRef(null);

    function salvarConfiguracao() {
        editorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;

            if (!props.valid) {
                msgWarning('Informe os campos obrigatórios');
                props.handleSubmit();
            } else {
                props.formValue.html = html;
                props.formValue.design = JSON.stringify(design);
                delete (props.formValue.status_descricao);
                if (props.readOnly) {
                    props.update(props.formValue);
                } else {
                    props.create(props.formValue);
                }
            }
        });

    }

    const onLoad = () => {
        debugger;
        editorRef.current.editor.setDisplayMode('web');
        editorRef.current.editor.setTranslations({ 'pt-BR': translate });
        editorRef.current.editor.setLocale('pt-BR');

        if (props.formValue.design) {
            const templateJson = JSON.parse(props.formValue.design);
            editorRef.current.editor.loadDesign(templateJson);
        }
    }

    const onReady = () => {
        // editor is ready
        // console.log('onReady');
    };

    return (
        <form name={props.name}>
            <CardBodyScroll>
                <Field
                    name='id'
                    component={LabelAndInput}
                    readOnly={true}
                    label='Código'
                    cols='12'
                    placeholder='Automático'
                    wCol="135"
                />

                <Field
                    name='titulo'
                    maxLength={100}
                    component={LabelAndInput}
                    label='Título'
                    cols='12'
                    placeholder='Informe o título'
                    validate={required}
                />

                <EmailEditor
                    ref={editorRef}
                    onLoad={onLoad}
                    onReady={onReady}
                />

            </CardBodyScroll>
            <CardFooter>
                <Button type='button' className={props.submitClass} icon='check' label={props.submitLabel} onClick={salvarConfiguracao} />
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

const mapDispatchToProps = dispatch => bindActionCreators({ init, update, getList, create }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ConfiguracaoForm);