import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import './atrasoNode.css';
import Node from '../../node';

const AtrasoNode = (props) => {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const [active, setActive] = useState(false);
    document.getElementsByClassName('react-flow__pane')[0].addEventListener('click', () => {
        setActive(false);
    });

    const listTipo = [
        {id: 1, descricao: 'Dias'},
        {id: 2, descricao: 'Horas'},
        {id: 3, descricao: 'Minutos'},
        {id: 4, descricao: 'Segundos'}
    ]

    const [tempo, setTempo] = useState({valor: 23, tipo: 1});

    return (
        <Node active={active} tipo='atrasoNode' data={props.data}>  

            <Handle type="target" position={Position.Left} id='t' />
            <div 
                className={`fluxoNode atrasoNode ${(active) ? 'nodeActive' : ''}`} 
                onClick={() => setActive(!active)}
            >
                <div className='node-title'>
                    <i className='fas fa fa-clock'></i>
                    <span>Atraso Inteligente</span>
                </div>
                <div className='node-content'>
                    <div className='item-content'>
                        <span className='descricao'>Aguarde 
                            <input className='input-atraso' type='number' min={0} value={tempo.valor} onChange={(e) => setTempo({...tempo, valor: e.target.value})} />
                            <select className='select-atraso'>
                            {listTipo.map((tipo, index) => (
                                <option key={index} value={tipo.id} onClick={() => setTempo({...tempo, tipo: tipo.id})}>
                                {tipo.descricao}
                                </option>
                            ))}
                        </select>
                            e depois continue</span>
                    </div>
                </div>
                <div className='node-footer'>
                    <span>Próximo Passo</span>
                </div>
            </div>
            <Handle type="source" position={Position.Right} id='cb' />
        </Node>
    );
}

export default AtrasoNode;