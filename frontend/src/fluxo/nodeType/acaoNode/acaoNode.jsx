import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import './acaoNode.css';
import IF from '../../../common/operator/if';
import Node from '../../node';
import { getListTag } from '../../../tag/tagActions';
import TelaInitialNode from '../initialNode/telaInitialNode';

const AcaoNode = (props) => {
  const getAcaoId = () => `acao_${new Date()}`;
  const [contentNode, setContentNode] = useState(props.data.content ?? []);
  const itens = [
    { tipo: 1, titulo: 'Ação de Lead', descricao: 'Ativa Lead', valor: '' },
    { tipo: 2, titulo: 'Ação de Lead', descricao: 'Desativa Lead', valor: '' },
    { tipo: 3, titulo: 'Ação de Lead', descricao: 'Adiciona Tag', valor: '' },
    // { tipo: 4, titulo: 'Ação de Lead', descricao: 'Adiciona Sequência', valor: '' },
    // { tipo: 5, titulo: 'Ação de Lead', descricao: 'Remove Sequência', valor: '' },
  ];

  const onClickItem = (item) => {
    let newContent = [...contentNode];
    item.id = getAcaoId();
    newContent.push(item);
    setContentNode(newContent);
    props.data.functions.onCloseModalTela()
  };

  const telaNode = TelaInitialNode(itens, onClickItem, 'Ações de Lead', 'A ação de Lead é uma ação específica do sistema que será executada no lead.');


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
    <Node active={active} tipo='acaoNode' data={props.data}>
      <Handle type="target" position={Position.Left} id='b' />
      <div className={`fluxoNode acaoNode ${(active) ? 'nodeActive' : ''}`} onClick={() => setActive(!active)}>
        <div className='node-title'>
          <i className='fas fa fa-bolt'></i>
          <span>Ações</span>
        </div>
        <div className='node-content'>
          <IF condicao={contentNode.length}>
            {
              contentNode.map((acao, i) => {
                return (
                  <>
                    <div className='item-content'>
                      <span className='item-titulo' key={'titulo' + i}>{acao.titulo}</span>
                      <span className='item-descricao' key={'descricao' + i}>{acao.descricao}</span>
                      <i className='fas fa fa-trash  btn-excluir' onClick={() => removeAcao(acao)} key={'btn' + i}></i>
                      <IF condicao={acao.tipo === 3}>
                        <select className='select-tag'>
                          <option>Selecione a Tag...</option>
                          {listTag.map((tag, index) => (
                            <option key={index} value={tag.id} onClick={() => updateAcao(acao, tag.id)}>
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
            <div className='node-button' onClick={addNewAcao}>
              <span>Clique para adicionar uma ação</span>
            </div>
          </IF>
        </div>
        <IF condicao={contentNode.length}>
          <div className='node-button' onClick={addNewAcao}>
            <span>+ Nova Ação</span>
          </div>
        </IF>
        <div className='node-footer'>
          <span>Próximo Passo</span>
        </div>
      </div>
      <Handle type="source" position={Position.Right} id='sb' />
    </Node>
  );
}

export default AcaoNode;