import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import './condicaoNode.css';
import IF from '../../../common/operator/if';
import Node from '../../node';
import { getListTag }  from '../../../tag/tagActions';
import TelaInitialNode from '../initialNode/telaInitialNode';

const CondicaoNode = (props) => {
    const getAcaoId = () => `acao_${new Date()}`;
    const [contentNode, setContentNode] = useState(props.data.content ?? []);
    const itens = [
        { tipo: 1, titulo: 'Ação de Lead', descricao: 'Ativa Lead', valor: '' },
        { tipo: 2, titulo: 'Ação de Lead', descricao: 'Desativa Lead', valor: '' },
        { tipo: 3, titulo: 'Ação de Lead', descricao: 'Adiciona Tag', valor: '' },
        { tipo: 4, titulo: 'Ação de Lead', descricao: 'Adiciona Sequência', valor: '' },
        { tipo: 5, titulo: 'Ação de Lead', descricao: 'Remove Sequência', valor: '' },
      ];

      const onClickItem = (item) => {
        let newContent = [...contentNode];
        item.id = getAcaoId();
        newContent.push(item);
        setContentNode(newContent);
        props.data.functions.onCloseModalTela()
      };
    
        const telaNode = TelaInitialNode(itens, onClickItem, 'Eventos de Lead', 'O evento de Lead é um evento específico do sistema que inicia sua automação.');
    

    const [listTag, setListTag] = useState([]);

    useEffect(() => {
        getListTag(setListTag);
    }, []);

    const addNewAcao = (e) => {
        props.data.functions.openModalTela({ content: telaNode, titulo: 'Realize as seguintes ações...' });
    }

    const updateAcao = (acao, valor) => {
        let newContent = [];
        contentNode.map((item) => {
            if (item.id === acao.id) {
                item.valor = valor;
            }
            newContent.push(item);
            return item;
        });
        setContentNode(newContent);
    }

    const removeAcao = (acao) => {
        let newContent = [];
        contentNode.map((item) => {
            if (item.id !== acao.id) {
                newContent.push(item);
            }
            return item;
        });
        setContentNode(newContent);
    }

    const [active, setActive] = useState(false);
    document.getElementsByClassName('react-flow__pane')[0].addEventListener('click', () => {
        setActive(false);
    });

    return (
        <Node active={active} tipo='condicaoNode' data={props.data}>
            <Handle type="target" position={Position.Left} id='t' />
            <div
                className={`fluxoNode condicaoNode ${(active) ? 'nodeActive' : ''}`}
                onClick={() => setActive(!active)}
            >
                <div className='node-title'>
                    <i className='fas fa fa-filter'></i>
                    <span>Condição</span>
                </div>
                <div className='node-content'>
                    <IF condicao={contentNode.length}>
                        {
                            contentNode.map((condicao, i) => {
                                return (
                                    <>
                                        <div className='item-content' key={i}>
                                            <span className='descricao'>{condicao.descricao}</span>
                                        </div>
                                        <hr />
                                    </>)
                            })
                        }
                    </IF>
                    <IF condicao={!contentNode.length}>
                        <div className='node-button'>
                            <span>Clique para adicionar uma condição</span>
                        </div>
                    </IF>
                </div>
                <div className='node-footer'>
                    <span>O lead não corresponde a nenhuma das condições</span>
                </div>
            </div>
            <Handle type="source" position={Position.Right} id='cb' />
        </Node>
    );
}

export default CondicaoNode;