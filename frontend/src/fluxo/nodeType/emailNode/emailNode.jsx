import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import './emailNode.css';
import Node from '../../node';
import { getListEmail }  from '../../../email/emailActions';
import { updateNode } from '../../fluxoActions';

const EmailNode = (props) => {
    const [active, setActive] = useState(false);
    const [existeEtapa, setExisteEtapa] = useState(false);

    document.getElementsByClassName('react-flow__pane')[0].addEventListener('click', () => {
        setActive(false);
    });

    const [email, setEmail] = useState(null);
    const [listEmail, setListEmail] = useState([]);

    useEffect(() => {
        getListEmail(setListEmail);
    },[]);

    const atualizaEtapa = (newContent) => {
        setEmail(newContent);
        let etapa = {id: props.id, data: newContent};
        updateNode(etapa, existeEtapa);
    }

    return (
        <Node active={active} tipo='emailNode' data={props.data} id={props.id} setContent={setEmail} fnEtapaNova={setExisteEtapa}>  
            <Handle type="target" position={Position.Left} id='t' />
            <div 
                className={`fluxoNode emailNode ${(active) ? 'nodeActive' : ''}`} 
                onClick={() => setActive(!active)}
            >
                <div className='node-title'>
                    <i className='fas fa fa-envelope'></i>
                    <span>Email</span>
                </div>
                <div className='node-content'>
                    <div className='item-content'>
                        <select className='select-email' required={true}>
                            <option>Selecione o E-mail para envio</option>
                            {listEmail.map((itemList, index) => (
                                <option key={index} value={itemList.id} onClick={() => atualizaEtapa(itemList.id)} selected={email === itemList.id}>
                                {itemList.assunto}
                                </option>
                            ))}
                        </select>
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

export default EmailNode;