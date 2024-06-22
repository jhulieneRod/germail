import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  useReactFlow
} from 'reactflow';
import './fluxo.css';
import { CardBodyScroll, CardFooter } from '../common/layout/card';
import InitialNode from './nodeType/initialNode/initialNode';
import InitialNodePasso from './nodeType/initialNodePasso/initialNodePasso';
import AcaoNode from './nodeType/acaoNode/acaoNode';
import CondicaoNode from './nodeType/condicaoNode/condicaoNode';
import AtrasoNode from './nodeType/atrasoNode/atrasoNode';
import { getDadosFluxo, updateFluxo } from './fluxoActions';
import ModalTela from '../common/modal/modalTela';
import EmailNode from './nodeType/emailNode/emailNode';

const Fluxo = (props) => {

  const [show, setShow] = useState(false);
  const [tela, setTela] = useState({content: '', titulo: ''});

  const openModalTela = (telaNode) => {
    setShow(true);
    setTela(telaNode);
  }

  const [dadosFluxo, setDadosFluxo] = useState({ id: 0, nodes: [], edges: []});

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (props.fluxo) {
      getDadosFluxo(props.fluxo, setDadosFluxo);
    }
  }, [])

  const getNodeId = () => `${Date.now()}`;

  const onAdd = useCallback((type, data) => {
    let newNode = {id: getNodeId(), type, position: { x: 400, y: 100 }, data};
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onDelete = useCallback((newNode) => {
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const functions = {openModalTela, onCloseModalTela: () => setShow(false), onAdd, onDelete};

  const initialNodes = [
    { id: `initial_${getNodeId()}`, type: 'initialNode', position: { x: 20, y: 20 }, data: {functions, content: []}, deletable: false}
  ];

  useEffect(() => {    
    if (dadosFluxo.nodes.length) {
      let newNodes = [];    
      dadosFluxo.nodes.map((node) => {
        node.data.functions = functions;
        newNodes.push(node);
      })
      setNodes(newNodes);
    }else{
      setNodes(initialNodes)
    }

    if (dadosFluxo.edges.length) {
      setEdges(dadosFluxo.edges);
    }
  }, [dadosFluxo])

  const nodeTypes = useMemo(() => ({
    initialNode: InitialNode,
    initialNodePasso: InitialNodePasso,
    acaoNode: AcaoNode,
    condicaoNode: CondicaoNode,
    atrasoNode: AtrasoNode,
    emailNode: EmailNode
  }), []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const [rfInstance, setRfInstance] = useState(null);

  const onSave = useCallback(() => {  
    if (rfInstance) {
      let flow = rfInstance.toObject();
      let newFlow = {id: props.fluxo, nodes: JSON.stringify(flow.nodes), edges: JSON.stringify(flow.edges)};
      updateFluxo(newFlow);
    }
  }, [rfInstance]);

  return (
    <>
      <ModalTela show={show} onClose={() => setShow(false)} titulo={tela.titulo}>
        {tela.content}
      </ModalTela>
      <CardBodyScroll>
        <div style={{ width: '85vw', height: '70vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            style={
              {
                backgroundColor: '#e8e8e8d4',
              }
            }
            onInit={setRfInstance}
          >
            <Controls />
            <MiniMap />
            <Panel position="top-right">
              <InitialNodePasso data={{functions, content: []}}></InitialNodePasso>
            </Panel>
          </ReactFlow>
        </div>
      </CardBodyScroll>
      <CardFooter>
        <Button type='button' className='primary' icon='check' label='Salvar' onClick={onSave}>Salvar</Button>
        <Button type='button' className='secondary' icon='times' label='Voltar' onClick={props.onClickVoltar}>Voltar</Button>
      </CardFooter>
    </>
  );
};

export default Fluxo;
