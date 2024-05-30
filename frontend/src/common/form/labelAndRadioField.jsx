import React, { Component } from 'react';
import Grid from '../layout/grid';
import './form.css';
// import { Field } from 'redux-form';


//  ESSE COMPONENTE NÃO FUNCIONAR PARA RECEBER OS DADOS DO BANCO

class LabelAndRadioField extends Component {

    constructor(props) {
        super(props);

        this.renderRadio = this.renderRadio.bind(this);
    }

    renderRadio() {
        let list = this.props.list || [];

        return list.map(record => (
            <div className='icheck-orange icheck-inline' key={record.value} >
                <input {...this.props.input} type='radio' id={this.props.input.name + '_' + record.value} value={record.value} />
                <label htmlFor={this.props.input.name + '_' + record.value}>{record.text}</label>
            </div>
        ))
    }

    render() {
        return (
            <Grid cols={this.props.cols} className={this.props.colsClass} style={this.props.colsStyle}>
                <div className='form-group form-group-sm'>
                    <label className='label-gt' htmlFor={this.props.name}>{this.props.label}</label>
                    <div >
                        {this.renderRadio()}
                    </div>

                    {/* {this.props.meta.touched && ((this.props.meta.error && <span className='msg_span'>{this.props.meta.error}</span>) || (this.props.meta.warning && <span className='msg_span'>{this.props.meta.warning}</span>))} */}
                </div>
            </Grid>
        )
    }
}

export default LabelAndRadioField;

