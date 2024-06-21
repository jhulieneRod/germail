import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import './emailNode.css';
import Node from '../../node';
import { getListEmail }  from '../../../email/emailActions';

const EmailNode = (props) => {
    const [active, setActive] = useState(false);
    document.getElementsByClassName('react-flow__pane')[0].addEventListener('click', () => {
        setActive(false);
    });

    const [email, setEmail] = useState(null);
    const [listEmail, setListEmail] = useState([]);

    useEffect(() => {
        getListEmail(setListEmail);
    },[]);

    return (
        <Node active={active} tipo='emailNode' data={props.data}>  

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
                        <select className='select-email'>
                            <option>Selecione o E-mail para envio</option>
                            {listEmail.map((email, index) => (
                                <option key={index} value={email.id} onClick={() => setEmail(email.id)}>
                                {email.assunto}
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