import React from "react";

const NodeItens = (props) => {
    return (
        <div className={`nodeItens ${(props.show) ? 'showItens' : ''}`}>
            <i className='fas fa fa-clone clone' onClick={props.onClone}></i>
        </div>
    );
}

export default NodeItens;