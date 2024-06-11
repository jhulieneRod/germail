import React, { Component } from 'react';
// import adminlte from 'admin-lte';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuTree from './menuTree';
import MenuItemClick from './menuItemClick';
import { logout } from '../../auth/authActions';
import Dashboard from '../../dashboard/dashboard';
import CadConfiguracao from '../../configuracao/configuracao';
import CadTag from '../../tag/tag';
import CadLead from '../../lead/lead';
import CadEmail from '../../email/email';
import Sequencia from '../../fluxo/fluxo';

/** USADO PARA O MENU FUNCIONAR CORRETAMENTE */
var treeViewGT;
window.$(window).on('load.lte.treeview', function (e) {
    treeViewGT = e;
});

class Menu extends Component {

    componentDidMount() {
        /** USADO PARA O MENU FUNCIONAR CORRETAMENTE */
        if (treeViewGT)
            window.$('[data-widget="treeview"]').Treeview('init');
    }
    componentWillUnmount() {
        /** USADO PARA O MENU FUNCIONAR CORRETAMENTE */
        treeViewGT = null;
    }

    render() {

        return (
            <nav className='mt-2'>
                {/* <ul className="nav nav-pills nav-sidebar flex-column nav-legacy nav-compact nav-child-indent" data-widget="treeview" role="menu" data-accordion="false"> */}
                <ul className="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">

                    <MenuItemClick name='dashboardgeral' label='Dashboard' icon='tachometer-alt' onClick={this.props.addTabs}> <Dashboard /> </MenuItemClick>
                    {/* <MenuItemClick name='configuracao' label='Configuração' icon='gear' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadConfiguracao />) }}> </MenuItemClick> */}
                    <MenuTree label='Cadastro' name='subcadastrogeral' icon='edit'>
                        <MenuItemClick name='cadtag' label='Tag' icon='' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadTag />) }} />
                        <MenuItemClick name='cadlead' label='Lead' icon='' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadLead />) }} />
                    </MenuTree>
                    <MenuTree label='E-mail' name='subemail' icon='envelope'>
                       <MenuItemClick name='cademail' label='Cadastro' icon='' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadEmail />) }} />
                       <MenuItemClick name='sequenciaemail' label='Sequência' icon='' onClick={(e, menu) => { this.props.addTabs(e, menu, <Sequencia />) }} />
                    </MenuTree>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Menu)