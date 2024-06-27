import React from "react";

const NodeItens = (props) => {

    return (
        <div className={`nodeItens ${(props.show) ? 'showItens' : ''}`}>
            <i className='fas fa fa-clone clone' onClick={props.onClone}></i>
            {/* <i className='fas fa fa-trash trash' onClick={}></i> */}
        </div>
    );
}

export default NodeItens;