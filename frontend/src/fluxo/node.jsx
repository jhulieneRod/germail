import React, { useEffect, useState } from 'react';
import NodeItens from './nodeItens';
import { getContentNode } from './fluxoActions';

const Node = (props) => {
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    getContentNode(props.id, validaEtapa);
  }, []);

  const validaEtapa = (etapa) => {
    debugger;
    if(etapa){
      props.setContent(etapa.data);
      props.fnEtapaNova(true);
    }
  };

  return (
      <div className='nodeComplete' 
          onMouseEnter={() => setShowDiv(true)}
          onMouseLeave={() => setShowDiv(false)}
        >
          <NodeItens 
          onClone={() => props.data.functions.onAdd(props.tipo, props.data)} 
          onDelete={() => props.data.functions.onDelete(props.tipo, props.data)}
          show={(showDiv || props.active)}/>
            {props.children}
      </div>
  );
}

export default Node;