import React from "react";
import './telaInitialNode.css';

const TelaInitialNode = (itens, onClickItem, titulo, descricao) => {

    return (
        <div className="telaInitialNode">
            <div className="tela-title">
                <span className="title-span">{titulo}</span>
                <span className="desc-span">{descricao}</span>
            </div>
            <div className="list-evento">
                { itens.map((item, i) => {
                    return (
                        <div onClick={() => onClickItem(item)} className="item-content">
                            <i className="fas fa fa-users item-evento" key={'icon'+i}></i>
                            <span className="item-titulo" key={'titulo'+i}>{item.titulo}</span>
                            <span className="item-desc" key={'desc'+i}>{item.descricao}</span>
                        </div>
                    )
                    })
                }
            </div>
        </div>
        
    )
}

export default TelaInitialNode;