import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import If from '../operator/if'
import { selectTab } from './tabActions'

class TabHeader extends Component {

    render() {
        let tabChage = JSON.parse(localStorage.getItem('_tabChange'));
        const selected = (tabChage && tabChage[this.props.getParent.ID]) ? tabChage[this.props.getParent.ID].select === this.props.target : false;
        let visible = (tabChage && tabChage[this.props.getParent.ID]) ? tabChage[this.props.getParent.ID].show[this.props.target] : false;
        let active = selected ? 'active' : '';

        return (
            <If condicao={visible}>
                <li className={`nav-item ${active}`}>
                    <a
                        className={`nav-link nav_link ${active}`}
                        style={selected ? { borderTop: 'solid 3px #3c8dbc' } : { color: '#495057' }}
                        onClick={() => this.props.selectTab(this.props.target, this.props.getParent.ID)}
                        data-target={this.props.target}
                        // id='custom-tabs-four-messages-tab' 
                        data-toggle='pill'
                        href='#'
                        role='tab'
                        // aria-controls='custom-tabs-four-messages'
                        aria-selected='false'
                    >
                        <i className={`fa fa-${this.props.icon} ${this.props['data-icon']}`}></i> {this.props.label}
                    </a>
                </li>
            </If>
        )
    }
}

const mapStateToProps = state => ({ tab: state.tab })
const mapDispatchToProps = dispatch => bindActionCreators({ selectTab }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TabHeader)