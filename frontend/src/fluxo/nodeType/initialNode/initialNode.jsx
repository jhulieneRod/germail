import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import './initialNode.css';
import IF from '../../../common/operator/if';
import TelaInitialNode from './telaInitialNode';
import { getListTag } from '../../../tag/tagActions';
import { updateNode, getContentNode } from '../../fluxoActions';

const InitialNode = (props) => {
  const getGatilhoId = () => `gatilho_${Date.now()}`;
  const [contentNode, setContentNode] = useState([]);
  const [existeEtapa, setExisteEtapa] = useState(false);

  const itens = [
    { tipo: 1, titulo: 'Evento de Lead', descricao: 'Novo Lead Incluído', valor: '' },
    { tipo: 2, titulo: 'Evento de Lead', descricao: 'Lead Desativado', valor: '' },
    { tipo: 3, titulo: 'Evento de Lead', descricao: 'Lead Ativado', valor: '' },
    { tipo: 4, titulo: 'Evento de Lead', descricao: 'Tag Atribuída ao Lead', valor: '' },
  ];

  const updateEtapa = (contentEtapa) => {
    let etapa = {id: props.id, data: JSON.stringify(contentEtapa)};
    updateNode(etapa, existeEtapa);
  }

  const onClickItem = (item) => {
    let newContent = [...contentNode];
    item.id = getGatilhoId();
    newContent.push(item);
    setContentNode(newContent);
    props.data.functions.onCloseModalTela();
    updateEtapa(newContent);
  };

  const telaNode = TelaInitialNode(itens, onClickItem, 'Eventos de Lead', 'O evento de Lead é um evento específico do sistema que inicia sua automação.');

  const [listTag, setListTag] = useState([]);

  const validaEtapa = (etapa) => {
    if(etapa){
      setContentNode(etapa.data);
      setExisteEtapa(true);
    }
  };

  useEffect(() => {
    getListTag(setListTag);
    getContentNode(props.id, validaEtapa);
  }, []);

  const addNewGatilho = (e) => {
    props.data.functions.openModalTela({ content: telaNode, titulo: 'Iniciar automação quando...' });
  }

  const updateGatilho = (gatilho, valor) => {
    let newContent = [];
    contentNode.map((item) => {
      if (item.id === gatilho.id) {
        item.valor = valor;
      }
      newContent.push(item);
      return item;
    });
    setContentNode(newContent);
    updateEtapa(newContent);
  }

  const removeGatilho = (gatilho) => {
    let newContent = [];
    contentNode.map((item) => {
      if (item.id !== gatilho.id) {
        newContent.push(item);
      }
      return item;
    });
    setContentNode(newContent);
    updateEtapa(newContent);
  }

  const [active, setActive] = useState(false);
  document.getElementsByClassName('react-flow__pane')[0].addEventListener('click', () => {
    setActive(false);
  });

  return (
    <>
      <div className={`fluxoNode customNode ${(active) ? 'nodeActive' : ''}`} onClick={() => setActive(!active)}>
        <div className='node-title'>
          <i className='fas fa fa-bolt'></i>
          <span>Quando...</span>
        </div>
        <div className='node-content'>
          <IF condicao={contentNode.length}>
            {
              contentNode.map((gatilho, i) => {
                return (
                  <>
                    <div className='item-content'>
                      <span className='item-titulo' key={'titulo' + i}>{gatilho.titulo}</span>
                      <span className='item-descricao' key={'descricao' + i}>{gatilho.descricao}</span>
                      <i className='fas fa fa-trash  btn-excluir' onClick={() => removeGatilho(gatilho)} key={'btn' + i}></i>
                      <IF condicao={gatilho.tipo === 4}>
                        <select className='select-tag'>
                          <option>Selecione a Tag...</option>
                          {listTag.map((tag, index) => (
                            <option key={index} value={tag.id} onClick={() => updateGatilho(gatilho, tag.id)} selected={gatilho.valor ===tag.id}>
                              {tag.titulo}
                            </option>
                          ))}
                        </select>
                      </IF>
                    </div>
                    <hr className='hr-item' />
                  </>)
              })
            }
          </IF>
          <IF condicao={!contentNode.length}>
            <span className='desc-gatilho'>O gatilho é responsável por acionar a automação. Clique para adicionar um gatilho</span>
          </IF>
        </div>
        <div className='node-button' onClick={addNewGatilho}>
          <span>+ Novo Gatilho</span>
        </div>
        <div className='node-footer'>
          <span>Então</span>
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="initial" />
    </>
  );
}

export default InitialNode;