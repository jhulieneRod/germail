import React, { useState } from 'react';
import NodeItens from './nodeItens';

const Node = (props) => {
  const [showDiv, setShowDiv] = useState(false);
  return (
      <div className='nodeComplete' 
          onMouseEnter={() => setShowDiv(true)}
          onMouseLeave={() => setShowDiv(false)}
        >
          <NodeItens 
          onClone={() => props.data.functions.onAdd(props.tipo, props.data.functions, props.data)} 
          onDelete={() => props.data.functions.onDelete(props.tipo, props.data.functions)}
          show={(showDiv || props.active)}/>
            {props.children}
      </div>
  );
}

export default Node;