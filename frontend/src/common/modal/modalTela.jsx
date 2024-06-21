import React, { useEffect, useState } from "react";
import './modalTela.css';

const ModalTela = (props) => {
  return (
    <>
      {props.show && (
        <div className="modalTela popup-overlay">
          <div className="modalTela popup-container">
            <div className="modalTela popup-header">
              <span className="modalTela close-icon" onClick={props.onClose}></span>
            </div>
            <div className="modalTela popup-content">
                <div className="modalTela popup-titulo">
                    {props.titulo}
                </div>
              {props.children}
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default ModalTela;
