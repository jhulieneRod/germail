import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, getFormValues } from 'redux-form';

import { init, create, update } from './processoActions';
import { required, onlyNums } from '../common/form/inputConfig';
import LabelAndInput from '../common/form/labelAndInput';
import Button from '../common/form/button';
import { msgWarning } from '../common/msg/msg';
import { CardBody, CardFooter } from '../common/layout/card';

class ProcessoForm extends Component {

    constructor(props) {
        super(props);

        this.salvarProcesso = this.salvarProcesso.bind(this);
        this.cancelaProcesso = this.cancelaProcesso.bind(this);
    }

    salvarProcesso() {

        if (!this.props.valid) {
            msgWarning('Informe os campos obrigatórios');
            this.props.handleSubmit();
        } else {
            if (this.props.readOnly) {
                this.props.update(this.props.formValue);
            } else {
                this.props.create(this.props.formValue);
            }
        }

    }

    cancelaProcesso() {
        this.setState({ dsProcessoSearch: '' });
        this.props.init();
    }

    render() {
        return (
            <form name={this.props.name}>

                <CardBody>
 
                    <Field
                        name='id'
                        component={LabelAndInput}
                        readOnly={true}
                        label='Código'
                        cols='12'
                        wCol='135'
                    />

                    <Field
                        name='descricao'
                        component={LabelAndInput}
                        label='Descrição'
                        cols='12'
                    />

                    <Field
                        name='prazo'
                        component={LabelAndInput}
                        type='date'
                        label='Prazo'
                        cols='12 2'
                        placeholder='Informe o prazo'
                        validate={required}
                    />

                </CardBody>
                <CardFooter>
                    <Button type='button' className={this.props.submitClass} icon='check' label={this.props.submitLabel} onClick={this.salvarProcesso} />
                    <Button type='button' className='secondary' icon='times' label='Cancelar' onClick={this.cancelaProcesso} />
                </CardFooter>
            </form>
        )
    }
}

ProcessoForm = reduxForm({ form: 'processoForm', destroyOnUnmount: false, })(ProcessoForm);

const mapStateToProps = state => ({
    formValue: getFormValues('processoForm')(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProcessoForm);