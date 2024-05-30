import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import LabelAndSelectForm from '../common/form/labelAndSelectForm';
import Select from '../common/form/select';
import If from '../common/operator/if';

// class SelectComboBox extends Component {

const SelectComboBox = props => {

    const [value, setValue] = useState(props.value || 'selecione');

    const wCol = (!props.wCol && (props.comboBoxId === 1 || props.comboBoxId === 29)) ? 100 : props.wCol;

    function renderRows() {

        const list = props.list || [];
        const id = 'valor';
        const text = 'descricao';

        return list.map(record => {
            if (record['chave'] == props.comboBoxId)
                return <option key={record[id]} value={record[id]} >{record[text]}</option>
        })
    }


    return (
        <>
            <If condicao={!props.isField}>
                <Select
                    id={props.id}
                    name={props.name}
                    component={LabelAndSelectForm}
                    label={props.label}
                    validate={props.validate}
                    wCol={wCol}
                    onChange={(event) => {
                        setValue(event.target.value);
                        props.onChange(event);
                    }}
                >
                    <option key='sel' value="selecione">Selecione</option>
                    <If condicao={props.addAll}>
                        <option value="todos">Todos</option>
                    </If>
                    {renderRows()}
                </Select>
            </If>
            <If condicao={props.isField}>
                <Field
                    cols={props.cols}
                    wCol={wCol}
                    colsStyle={props.colsStyle}
                    id={props.id}
                    name={props.name}
                    component={LabelAndSelectForm}
                    label={props.label}
                    validate={props.validate}
                    readOnly={props.readOnly}
                    disabled={props.disabled}
                    onChange={props.onChange}
                    isOptional={props.isOptional ? props.isOptional : false}
                >
                    <option key='sel' value="selecione">Selecione</option>
                    {renderRows()}
                </Field>
            </If>
        </>
    )
}

const mapStateToProps = state => ({ list: state.comboboxCad.list })
export default connect(mapStateToProps, null)(SelectComboBox)