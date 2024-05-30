import React from 'react';
import If from '../operator/if';
import { isMobile } from 'react-device-detect';

const menuItemClick = props => {
    return (
        <li className='nav-item'>
            <a
                href='#'
                className='nav-link'
                // style={{padding:'.4rem .4rem', marginLeft: (props.icon) ? '' : '20px'}}
                // data-toggle={(isMobile) ? 'push-menu' : ''}
                onClick={(e) => {
                    props.onClick(e, props);

                    if (isMobile)// quando for celular tem que fechar o menu quando clica
                        window.$('[data-widget="pushmenu"]').PushMenu("collapse");
                    /** Isso deixa o pai na cor do projeto quando ativa */
                    window.$('ul.nav-sidebar a').removeClass('active');
                    let obj = (e.target.childElementCount > 0) ? e.target : e.target.parentElement;
                    obj.classList.add('active');
                    window.$(obj).parentsUntil(".nav-sidebar > .nav-treeview").prev('a').addClass('active');
                }}
            >
                <If condicao={props.icon}>
                    <i className={`nav-icon fa fa-${props.icon}`}></i>
                </If>
                <p>
                    {props.label}
                </p>
            </a>
        </li>
    )

}

export default menuItemClick;