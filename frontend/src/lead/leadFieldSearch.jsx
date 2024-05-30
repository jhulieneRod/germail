import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import LabelAndInputSearchCode from '../common/form/labelAndInputSearchCode';
import LeadListSearch from './leadListSearch';
import { getList } from './leadActions';
import { msgWarning } from '../common/msg/msg';

class LeadFieldSearch extends Component {

    constructor(props) {
        super(props);
        this.props.getList();

        this.selectRow = this.selectRow.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            show: false,
            dataDesc: (this.props['data-desc']) ? this.props['data-desc'] : ''
        }
    }

    selectRow(row) {
        this.props.onSelect(row, this.props.name, this.props['name-desc']);
        this.setState({ show: false });
    }

    handleBlur(e) {
        let row = null;
        if (e.target.value) {
            let list = this.props.list || [];

            for (const key in list) {
                if (parseInt(list[key].id) === parseInt(e.target.value))
                    row = list[key];
            }

            if (!row) {
                e.target.focus();
                msgWarning(`Registro "${e.target.value}" não encontrado`);
            }
        }
        this.props.onDescBlur(row, e.target.name, this.props['name-desc']);
    }

    handleChange(e) {
        this.setState({ dataDesc: this.props['data-desc'] })
    }

    render() {
        return (
            <>

                

                <Field
                    name={this.props.name}
                    component={LabelAndInputSearchCode}
                    data-desc={this.props['data-desc']}
                    onBtnClick={() => {
                        this.setState({ show: !this.props.readOnly });
                    }}
                    label={this.props.label}
                    cols={this.props.cols}
                    readOnly={this.props.readOnly}
                    validate={this.props.validate}
                    disabled={this.props.disabled}
                    onInputBlur={this.handleBlur}
                />                
            </>
        )
    }
}

const mapStateToProps = state => ({ list: state.leadCad.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(LeadFieldSearch)