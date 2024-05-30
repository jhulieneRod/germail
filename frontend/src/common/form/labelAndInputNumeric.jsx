import React, { Component } from 'react';
import Grid from '../layout/grid';

/*------------------------------------------

ESSE COMPENENTE NÃO É MAIS USADO PARA FORMS,
DEVE SER USADO O "normalize" DO REDUX-FORM

--------------------------------------------*/

class LabelAndInputNumeric extends Component {

    constructor(props) {
        super(props);

        // console.log('this.props.input.value',this.props.input.value);

        this.state = {
            value: this.props.input.value
        };
    }

    componentWillUnmount() {
        // console.log('aqui');
        this.setState({ value: 0 });
    }

    handleChange = (evt) => {
        const regExp = (this.props.dataType === 'integer') ? /^[0-9\b]+$/ : /^[+-]?\d*(?:[.]\d*)?$/;
        if (regExp.test(evt.target.value))
            this.setState({ value: evt.target.value });
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <div className='form-group form-group-sm'>
                    <label className='label-gt' htmlFor={this.props.name}>{this.props.label}</label>
                    <input {...this.props.input} className={`form-control ${this.props.meta.touched && ((this.props.meta.error && 'form-valid') || (this.props.meta.warning && 'form-valid'))}`}
                        placeholder={this.props.placeholder}
                        readOnly={this.props.readOnly}
                        type={this.props.type}
                        id={this.props.id}
                        min={this.props.min}
                        max={this.props.max}
                        maxLength={this.props.maxLength}
                        step={this.props.step}
                        defaultValue={this.props.defaultValue}
                        onKeyDown={this.props.onKeyDown}      
                        autoFocus={this.props.autoFocus}
                        onChange={this.handleChange}// foi comentado para funcionar a rotina de sugerir o numero do id
                        value={this.state.value}
                    />
                    {this.props.meta.touched && ((this.props.meta.error && <span className='msg_span'>{this.props.meta.error}</span>) || (this.props.meta.warning && <span className='msg_span'>{this.props.meta.warning}</span>))}

                </div>
            </Grid>
        )
    }
}

export default LabelAndInputNumeric;