import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import './condicaoNode.css';
import Node from '../../node';
import { getListTag } from '../../../tag/tagActions';
import { updateNode } from '../../fluxoActions';

const CondicaoNode = (props) => {
    const [existeEtapa, setExisteEtapa] = useState(false);
    const getCondicaoId = () => `condicao_${Date.now()}`;
    const initialCondicao = {
        id: getCondicaoId(),
        tipo: '',
        operador: '',
        valor: ''
    };

    const [contentNode, setContentNode] = useState({tipo: 1, condicoes: [initialCondicao]});

    const atualizaEtapa = (newContent) => {
        debugger;
        let etapa = { id: props.id, data: JSON.stringify(newContent) };
        updateNode(etapa, existeEtapa);
    }

    const [listTag, setListTag] = useState([]);

    useEffect(() => {
        getListTag(setListTag);
    }, []);

    const addNewCondicao = () => {
        let newContent = {...contentNode};
        let newCondicao = initialCondicao;
        newCondicao.id = getCondicaoId();
        newContent.condicoes.push(newCondicao);
        setContentNode(newContent);
        atualizaEtapa(newContent);
    }

    const updateCondicao = (newCondicao) => {
        let condicoes = [];
        contentNode.condicoes.map((item) => {
            condicoes.push((item.id === newCondicao.id) ? newCondicao : item);
            return item;
        });
        let newContentNode = {...contentNode, condicoes};
        setContentNode(newContentNode);
        atualizaEtapa(newContentNode);
    }

    const removeCondicao = (id) => {
        let condicoes = [];
        contentNode.condicoes.map((item) => {
            if (item.id !== id) {
                condicoes.push(item);
            }
            return item;
        });
        let newContentNode = {...contentNode, condicoes};
        setContentNode(newContentNode);
        atualizaEtapa(newContentNode);
    }

    const [active, setActive] = useState(false);
    document.getElementsByClassName('react-flow__pane')[0].addEventListener('click', () => {
        setActive(false);
    });

    const setDadosEtapa = (newContent) => {
        setContentNode(newContent);
    }

    return (
        <Node active={active} tipo='condicaoNode' data={props.data} id={props.id} setContent={setDadosEtapa} fnEtapaNova={setExisteEtapa}>
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
                    {
                        contentNode.condicoes.map((condicao, i) => {
                            return (
                                <>
                                    <div className='item-content'>
                                        <select className='select-condicao' key={'select_tipo_condicao' + i}>
                                            <option value={'tag'} onClick={() => { updateCondicao({ ...condicao, tipo: 'tag' }) }} selected={condicao.tipo === 'tag'}>Tag</option>
                                            <option value={'lead'} onClick={() => { updateCondicao({ ...condicao, tipo: 'lead' }) }} selected={condicao.tipo === 'lead'}>Lead</option>
                                        </select>
                                        <select className='select-condicao' key={'select_operador_condicao' + i}>
                                            <option value={'='} onClick={() => { updateCondicao({ ...condicao, operador: '=' }) }} selected={condicao.operador === '='}>É Igual</option>
                                            <option value={'!='} onClick={() => { updateCondicao({ ...condicao, operador: '!=' }) }} selected={condicao.operador === '!='}>Diferente de</option>
                                        </select>
                                        <select className='select-condicao' key={'select_valor_condicao' + i}>
                                            {listTag.map((tag, index) => (
                                                <option key={index} value={tag.id} onClick={() => { updateCondicao({ ...condicao, valor: tag.id }) }} selected={condicao.valor === tag.id}>
                                                    {tag.titulo}
                                                </option>
                                            ))}
                                        </select>
                                        <i className='fas fa fa-trash  btn-excluir' onClick={() => removeCondicao(condicao.id)} key={'btn_condicao' + i}></i>
                                    </div>
                                    <hr />
                                </>)
                        })
                    }
                    <div className='node-button' onClick={addNewCondicao}>
                        <span>{(contentNode.length) ? '+ Nova condição' : 'Clique para adicionar uma condição'}</span>
                    </div>
                </div>
                <div className='node-footer'>
                    <span>O lead corresponde a
                        <select className='select-condicao select-footer'>
                            <option value={1} onClick={() => { atualizaEtapa({...contentNode, tipo: 1})}} selected={contentNode.tipo === 1}>uma das</option>
                            <option value={2} onClick={() => { atualizaEtapa({...contentNode, tipo: 2})}} selected={contentNode.tipo === 2}>todas as</option>
                            <option value={3} onClick={() => { atualizaEtapa({...contentNode, tipo: 3})}} selected={contentNode.tipo === 3}>nenhuma das</option>
                        </select> condições</span>
                </div>
                <div className='node-footer'>
                    <span>Senão</span>
                </div>
            </div>
            <Handle type="source" position={Position.Right} id='cb1' style={{ bottom: '32px', backgroundColor: '#1d851d' }} />
            <Handle type="source" position={Position.Right} id='cb2' style={{ backgroundColor: '#ce3131' }} />
        </Node>
    );
}

export default CondicaoNode;