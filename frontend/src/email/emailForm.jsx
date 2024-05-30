import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { required } from '../common/form/inputConfig';
import { init, create, update } from './emailActions';
import LabelAndInput from '../common/form/labelAndInput';
import Button from '../common/form/button';
import { msgWarning } from '../common/msg/msg';
import { CardBodyScroll, CardFooter } from '../common/layout/card';
import EmailEditor from 'react-email-editor'
const translate = require('./editor-translate.json');

let EmailForm = (props) => {
    const emailEditorRef = useRef(null);

    function salvarEmail() {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;

            if (!props.valid) {
                msgWarning('Informe os campos obrigatórios');
                props.handleSubmit();
            } else {
                props.formValue.conteudo = html;
                props.formValue.design = JSON.stringify(design);
                delete(props.formValue.status_descricao);
                if (props.readOnly) {
                    props.update(props.formValue);
                } else {
                    props.create(props.formValue);
                }
            }
          });

    }

    const onLoad = () => {
        emailEditorRef.current.editor.setDisplayMode('email');
        emailEditorRef.current.editor.setTranslations({'pt-BR': translate});
        emailEditorRef.current.editor.setLocale('pt-BR');

        if(props.formValue.design){
            const templateJson = JSON.parse(props.formValue.design);
            emailEditorRef.current.editor.loadDesign(templateJson);
        }
    }

    const onReady = () => {
        // editor is ready
        // console.log('onReady');
    };

    return (
        <form name={props.name}>
            <CardBodyScroll>
                {false &&
                    <Field
                        name='id'
                        component={LabelAndInput}
                        readOnly={true}
                        label='Código'
                        cols='12'
                        placeholder='Automático'
                        wCol="135"
                    />
                }

                <Field
                    name='assunto'
                    maxLength={100}
                    component={LabelAndInput}
                    label='Assunto'
                    cols='12'
                    placeholder='Informe o assunto do e-mail'
                    validate={required}
                />
                <EmailEditor
                    ref={emailEditorRef}
                    onLoad={onLoad}
                    onReady={onReady}
                />

            </CardBodyScroll>
            <CardFooter>
                <Button type='button' className={props.submitClass} icon='check' label={props.submitLabel} onClick={salvarEmail} />
                <Button type='button' className='secondary' icon='times' label='Cancelar' onClick={() => { props.init() }} />
            </CardFooter>
        </form>
    )
}

EmailForm = reduxForm({ form: 'emailForm', destroyOnUnmount: false, })(EmailForm);

const mapStateToProps = state => ({
    formValue: getFormValues('emailForm')(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);