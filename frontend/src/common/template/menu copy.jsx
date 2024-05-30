import React, { Component } from 'react';
// import adminlte from 'admin-lte';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuTree from './menuTree';
import MenuItemClick from './menuItemClick';
import { logout } from '../../auth/authActions';
import Dashboard from '../../dashboard/dashboard';
import Configuracao from '../../configuracao/configuracao';
import CadUsuario from '../../usuario/usuario';
import CadCliente from '../../cliente/cliente';
import CadEvento from '../../evento/evento';
import CadSituacao from '../../situacao/situacao';
import CadFuncionario from '../../funcionario/funcionario';
import CadFuncionarioDependente from '../../funcionario_dependente/funcionarioDependente';
import CadMotivo from '../../motivo/motivo';
import CadCargo from '../../cargo/cargo';
import CadEscala from '../../escala/escala';
import CadAdicional from '../../adicional/adicional';
import CadSindicato from '../../sindicato/sindicato';
import CadSalario from '../../salario/salario';
import CadOrganograma from '../../organograma/organograma';
import CadTerceiroDadoBancario from '../../terceiro_dado_bancario/terceiroDadoBancario';
import CadTerceiro from '../../terceiro/terceiro';
import CadEventoVariavel from '../../evento_variavel/eventoVariavel';
import CadEventoVariavelMatriz from '../../evento_variavel_matriz/eventoVariavelMatriz';
import CadBancoHoras from '../../banco_horas/bancoHoras';
import CadTerceiroPagamento from '../../terceiro_pagamento/terceiroPagamento';
import CadTomadorServico from '../../tomador_servico/tomadorServico';
import CadFechamentoPeriodo from '../../fechamento_periodo/fechamentoPeriodo';
import CadFuncionarioCC from '../../funcionario_centro_custo/funcionariocc';
import CadRescisao from '../../rescisao/rescisao';
import CadFerias from '../../ferias/ferias';
import CadDespesaMedica from '../../despesa_medica/despesaMedica';
import CadAfastamentos from '../../afastamentos/afastamentos';
import CadAdmissao from '../../admissao/admissao';

// RELATÓRIOS
import RelAlteracaoEscala from '../../relatorio/cadastro/listagemAlteracaoEscala';
import RelListagemFuncionarios from '../../relatorio/cadastro/listagemFuncionarios';
import RelAfastamento from '../../relatorio/cadastro/afastamento';
import RelListagemFuncionariosSalario from '../../relatorio/cadastro/listagemFuncionariosSalario';
import RelListagemEventos from '../../relatorio/cadastro/listagemEventos';
import RelMovimentoFerias from '../../relatorio/cadastro/movimentoFerias';
import RelFerias from '../../relatorio/cadastro/ferias';
import RelTomadorDeServico from '../../relatorio/cadastro/tomadorDeServico';
import RelContratoExperiencia from '../../relatorio/cadastro/contratoExperiencia';
import RelBancoHoras from '../../relatorio/banco_horas/bancoHoras';
import RelBancoHorasAnalitico from '../../relatorio/banco_horas/bancoHorasAnalitico';
import RelBancoHorasSaldo from '../../relatorio/banco_horas/bancoHorasSaldo'
import RelAlteracaoCargo from '../../relatorio/cadastro/alteracaoCargo'
import RelAutorizacaoDesconto from '../../relatorio/cadastro/autorizacaoDesconto'

// EXPORTACAO
import ExportacaoCentroCusto from '../../exportacao/centro_custo/exportacaoCentroCusto';
import ExportacaoRescisao from '../../exportacao/rescisao/rescisao';
import ExportacaoAfastamento from '../../exportacao/afastamento/afastamento';
import ExportacaoFerias from '../../exportacao/ferias/ferias';
import ExportacaoFuncionarioDependente from '../../exportacao/funcionario_dependente/funcionarioDependente';
import ExportacaoTomadorServico from '../../exportacao/tomador_servico/tomadorServico';
import ExportacaoHistorico from '../../exportacao/historico/historico';
import ExportacaoTerceiroPessoas from '../../exportacao/terceiros_pessoas/terceirosPessoas';
import ExportacaoTerceiroPagamentos from '../../exportacao/terceiros_pagamentos/terceirosPagamentos';
import ExportacaoAdmissao from '../../exportacao/admissao/admissao';
import ExportacaoEventosVariaveis from '../../exportacao/eventos_variaveis/eventosVariaveis';
import ExportacaoOrganograma from '../../exportacao/organograma/exportacaoOrganograma';
import ExportacaoDespesasMedicas from '../../exportacao/despesas_medicas/despesasMedicas';

/** USADO PARA O MENU FUNCIONAR CORRETAMENTE */
var treeViewGT;
window.$(window).on('load.lte.treeview', function (e) {
    treeViewGT = e;
});
// SE NÃO ELE SÓ ABRE E NÃO FECHA
/** **************************************** */

class Menu extends Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         controlCadTabs: []
    //     }
    // }

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
                <ul className="nav nav-pills nav-sidebar flex-column nav-legacy nav-compact nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">
                {/* <ul className="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu" data-accordion="false"> */}

                    <MenuItemClick name='dashboardgeral' label='Dashboard' icon='tachometer-alt' onClick={this.props.addTabs}> <Dashboard /> </MenuItemClick>
                    <MenuItemClick name='configuracao' label='Configuração' icon='cog' onClick={(e, menu) => { this.props.addTabs(e, menu, <Configuracao />) }} />                

                    <MenuTree label='Cadastro' name='subcadastrogeral' icon='edit'>
                        <MenuItemClick name='cadusuario' label='Usuário' icon='user' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadUsuario />) }} />
                        <MenuItemClick name='cadcliente' label='Cliente' icon='user' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadCliente />) }} />
                        <MenuItemClick name='cadevento' label='Evento' icon='clock' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadEvento />) }} />
                        <MenuItemClick name='cadmotivo' label='Motivo' icon='window-maximize' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadMotivo />) }} />
                        <MenuItemClick name='cadsituacao' label='Situação' icon='window-restore' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadSituacao />) }} />
                    </MenuTree>
                    <MenuTree label='Funcionário' name='subfuncionario' icon='users'>
                        <MenuItemClick name='cadfuncionario' label='Funcionário' icon='user' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadFuncionario />) }} />
                        <MenuItemClick name='cadfuncionariodependente' label='Dependente' icon='user-friends' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadFuncionarioDependente />) }} />
                        <MenuItemClick name='cadadicional' label='Adicional' icon='plus' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadAdicional />) }} />
                        <MenuItemClick name='cadcargo' label='Cargo' icon='suitcase' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadCargo />) }} />
                        <MenuItemClick name='cadescala' label='Escala' icon='weight' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadEscala />) }} />
                        <MenuItemClick name='cadsalario' label='Salário' icon='dollar-sign' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadSalario />) }} />
                        <MenuItemClick name='cadfuncionariocc' label='Centro de Custo' icon='dollar-sign' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadFuncionarioCC />) }} />
                        <MenuItemClick name='cadsindicato' label='Sindicato' icon='building' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadSindicato />) }} />
                        <MenuItemClick name='cadorganograma' label='Organograma' icon='project-diagram' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadOrganograma />) }} />
                    </MenuTree>                    
                    <MenuTree label='Terceiro' name='subterceiro' icon='user-tie'>
                        <MenuItemClick name='caddadobancario' label='Dados Bancários' icon='university' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadTerceiroDadoBancario />) }} />
                        <MenuItemClick name='cadterceiro' label='Terceiro' icon='user' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadTerceiro />) }} />
                    </MenuTree>
                    <MenuTree label='Lançamento' name='sublancamento' icon='scroll'>
                        <MenuItemClick name='cadadmissao' label='Admissão' icon='user-plus' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadAdmissao />) }} />
                        <MenuItemClick name='cadafastamentos' label='Afastamentos' icon='plus-circle' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadAfastamentos />) }} />
                        <MenuItemClick name='cadbancohoras' label='Banco Horas' icon='clock' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadBancoHoras />) }} />
                        <MenuItemClick name='caddespesamedica' label='Despesa Médica' icon='briefcase-medical' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadDespesaMedica />) }} />
                        <MenuItemClick name='cadeventosvariaveis' label='Eventos Variáveis' icon='university' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadEventoVariavel />) }} />
                        <MenuItemClick name='cadeventosvariaveismatriz' label='Matriz Eventos Variáveis' icon='university' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadEventoVariavelMatriz />) }} />
                        <MenuItemClick name='cadfechamentoperiodo' label='Fechamento Período' icon='check-double' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadFechamentoPeriodo />) }} />
                        <MenuItemClick name='cadferias' label='Férias' icon='umbrella-beach' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadFerias />) }} />

                        <MenuItemClick name='cadrescisao' label='Rescisão' icon='file-signature' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadRescisao />) }} />
                        <MenuItemClick name='cadterceiropagamento' label='Terceiro Pagamento' icon='money-bill' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadTerceiroPagamento />) }} />
                        <MenuItemClick name='cadtomadorservico' label='Tomador Serviço' icon='tools' onClick={(e, menu) => { this.props.addTabs(e, menu, <CadTomadorServico />) }} />
                    </MenuTree>
                
                    <MenuTree label='Relatório' name='subrelatorio' icon='file-pdf'>
                        <MenuTree label='Cadastro' name='subrelcadastro' icon='file'>
                            <MenuItemClick name='rellistagemeventos' label='Listagem Eventos' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelListagemEventos />) }} />
                            <MenuItemClick name='rellistagemfuncionarios' label='Listagem Funcionários' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelListagemFuncionarios />) }} />
                            <MenuItemClick name='rellistagemfuncionariossalario' label='Funcionários Salário' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelListagemFuncionariosSalario />) }} />
                            <MenuItemClick name='relmovimentoferias' label='Movimento Férias' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelMovimentoFerias />) }} />
                            <MenuItemClick name='relcontratoexperiencia' label='Contrato Experiência' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelContratoExperiencia />) }} />
                            <MenuItemClick name='relferias' label='ERP Férias' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelFerias />) }} />
                            <MenuItemClick name='relalteracaoescala' label='Alteração Escala' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelAlteracaoEscala />) }} />
                            <MenuItemClick name='relafastamento' label='Movimento Afastamentos' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelAfastamento />) }} />
                            <MenuItemClick name='reltomadordeservico' label='Tomador De Serviço' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelTomadorDeServico />) }} />
                            <MenuItemClick name='relalteracaocargo' label='Alteração de Cargo' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelAlteracaoCargo />) }} />
                            <MenuItemClick name='relautorizacaodesconto' label='Autorização Desconto' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelAutorizacaoDesconto />) }} />
                        </MenuTree>
                        <MenuTree label='Banco de Horas' name='subrelbancohoras' icon='file'>
                            <MenuItemClick name='relbancohoras' label='Banco Horas' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelBancoHoras />) }} />
                            <MenuItemClick name='relbancohorasanalitico' label='Banco Horas Analítico' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelBancoHorasAnalitico />) }} />
                            <MenuItemClick name='relbancohorassaldo' label='Banco Horas Saldo' icon='file-alt' onClick={(e, menu) => { this.props.addTabs(e, menu, <RelBancoHorasSaldo />) }} />
                        </MenuTree>
                    </MenuTree>
                
                    <MenuTree label='Exportação' name='subexportacao' icon='file-export'>
                        <MenuItemClick name='exportacaoadmissao' label='Admissão' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoAdmissao />) }} />
                        <MenuItemClick name='exportacaoafastamento' label='Afastamento' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoAfastamento />) }} />
                        <MenuItemClick name='exportacaocentrocusto' label='Centro de Custo' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoCentroCusto />) }} />
                        <MenuItemClick name='exportacaofuncionariodependente' label='Dependente Funcionário' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoFuncionarioDependente />) }} />
                        <MenuItemClick name='exportacaodespesamedicas' label='Despesas Médicas' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoDespesasMedicas />) }} />
                        <MenuItemClick name='exportacaoeventosvariaveis' label='Eventos Variáveis' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoEventosVariaveis />) }} />
                        <MenuItemClick name='exportacaoferias' label='Férias' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoFerias />) }} />
                        <MenuItemClick name='exportacaohistorico' label='Histórico' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoHistorico />) }} />
                        <MenuItemClick name='exportacaoorganograma' label='Organograma' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoOrganograma />) }} />
                        <MenuItemClick name='exportacaorescisao' label='Rescisão' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoRescisao />) }} />
                        <MenuItemClick name='exportacaotomadorservico' label='Tomador Serviço' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoTomadorServico />) }} />
                        <MenuTree label='Terceiros' name='subexportacaoterceiro' icon='file-export'>
                            <MenuItemClick name='exportacaoterceiropagamentos' label='Pagamentos' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoTerceiroPagamentos />) }} />
                            <MenuItemClick name='exportacaoterceiropessoas' label='Pessoas' icon='file-download' onClick={(e, menu) => { this.props.addTabs(e, menu, <ExportacaoTerceiroPessoas />) }} />
                       </MenuTree>
                    </MenuTree>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Menu)