import React from 'react';
import './initialNodePasso.css';

const InitialNodePasso = (props) => {

  const addNodeFluxo = (tipoNode) => {
    let type = '';
    switch(tipoNode){
      case 1:
        type = 'emailNode';
      break;
      case 2:
        type = 'acaoNode';
      break;
      case 3:
        type = 'condicaoNode';
      break;
      case 4:
        type = 'atrasoNode';
      break;
    }
    props.data.functions.onAdd(type, props.data);
  };

  return (
    <>
      <div className='initialNodePasso'>
        <div className='node-title'>
          <span>Nova Etapa</span>
        </div>
        <div className='node-content'>
          <span className='subtitulo'>Conteúdo</span>
          <div className='item-content' onClick={() => addNodeFluxo(1)}>
            <i className='fas fa fa-envelope'></i>
            <span>E-mail</span>
          </div>
          <span className='subtitulo'>Lógica</span>
          <div className='item-content' onClick={() => addNodeFluxo(2)}>
            <i className='fas fa fa-bolt' style={{ color: '#d03edd' }}></i>
            <span>Ações</span>
          </div>
          <div className='item-content' onClick={() => addNodeFluxo(3)}>
            <i className='fas fa fa-filter' style={{ color: 'rgb(62, 201, 110)' }}></i>
            <span>Condição</span>
          </div>
          <div className='item-content' onClick={() => addNodeFluxo(4)}>
            <i className='fas fa fa-clock' style={{ color: '#faab2f' }}></i>
            <span>Atraso Inteligente</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default InitialNodePasso;