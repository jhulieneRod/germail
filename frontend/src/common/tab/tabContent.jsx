import React, { Component } from 'react'
import { connect } from 'react-redux'
import If from '../operator/if'

class TabContent extends Component {

    // responsavel por dar o fucos no primeiro campo do form
    componentDidUpdate() {// a propriedade autoFocus=true resolveria se a tab "incluir" viesse selecionada como padrão.(não precisaria de tudo isso)
        if ((this.props.children) && (this.props.children.props.name)) {// só entra se tiver "name" no componente <Form/>
            let tabChage = JSON.parse(localStorage.getItem('_tabChange'));
            const selected = tabChage[this.props.getParent.ID].select === this.props.id;
            let visible = tabChage[this.props.getParent.ID].show[this.props.id];

            if (visible && selected) {// só faz o focus() se a aba estiver selecionada
                // let formulario = document[this.props.children.props.name].getElementsByTagName("input");
                let formulario = document[this.props.children.props.name].elements;
               
                localStorage.setItem('_cfg', JSON.stringify({ form: this.props.children.props.name}))

                for (let i = 0; i < formulario.length; i++) {
                    if (!formulario[i].readOnly) {// focus no primeiro campo ativo
                        formulario[i].focus();
                        break
                    }
                }
            }
        }
    }
    
    render() {
        let tabChage = JSON.parse(localStorage.getItem('_tabChange'));        
        const selected = (tabChage && tabChage[this.props.getParent.ID]) ? tabChage[this.props.getParent.ID].select === this.props.id : false;
        let visible = (tabChage && tabChage[this.props.getParent.ID]) ? tabChage[this.props.getParent.ID].show[this.props.id] : false;
        return (
            <If condicao={visible}>
                <div id={this.props.id}
                    className={`tab-pane ${selected ? 'active' : ''}`}
                > 
                    {this.props.children}
                </div> 
            </If>
        )
    }
}

const mapStateToProps = state => ({tab: state.tab})
export default connect(mapStateToProps)(TabContent)