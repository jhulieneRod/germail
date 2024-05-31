import React, { useCallback, useMemo } from 'react';
import { Card } from 'react-bootstrap';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge
  } from 'reactflow';
import 'reactflow/dist/style.css';

const Fluxo = (props) => {
  const initialNodes = [
    { id: '1', position: { x: 500, y: 100 }, data: { label: 'E-mail de Boas Vindas' } },
    { id: '2', position: { x: 500, y: 200 }, data: { label: 'E-mail de Informações Adicionais' } },
    { id: '3', position: { x: 400, y: 300 }, data: { label: 'E-mail Saber Mais' } },
    { id: '4', position: { x: 600, y: 300 }, data: { label: 'E-mail Cancelamento' } },
    { id: '5', position: { x: 500, y: 400 }, data: { label: 'E-mail Agradecimento' } },
    { id: '6', position: { x: 700, y: 400 }, data: { label: 'Desativa Lead' } },
  ];
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' , label: 'Abriu E-mail'},
    { id: 'e2-3', source: '2', target: '3' , label: 'Clicou em Saber Mais'},
    { id: 'e2-4', source: '2', target: '4' , label: 'Clicou em Cancelar'},
    { id: 'e3-5', source: '3', target: '5' , label: 'Abriu E-mail'},
    { id: 'e4-5', source: '4', target: '5' , label: 'Abriu E-mail'},
    { id: 'e4-6', source: '4', target: '6' , label: ''},
];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Card>
        {/* <div>
            <input type='text' />
            <button>add</button>
        </div> */}
        <div style={{ width: '85vw', height: '85vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    </Card>
  );
};

export default Fluxo;
