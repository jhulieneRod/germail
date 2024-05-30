import React, { useEffect, useState } from "react";

const InfoTooltip = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [infoData, setInfoData] = useState(null);

  const handleTogglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (props.info) {
      import(`../help/${props.info}`).then((module) => {
        setInfoData(module.default);
      });
    }
  }, [props.info]);

  const renderDetalhes = () => {
    return Object.keys(infoData.detalhes).map((key) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{infoData.detalhes[key]}</td>
      </tr>
    ));
  };

  return props.info ? (
    <>
      <span className="info-icon" onClick={handleTogglePopup} title="Informações do campo"></span>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-header">
              <span className="titulo-header">
                <span className="info-icon"></span>
                Informações do Campo [{infoData.nome}]
              </span>
              <span className="close-icon" onClick={handleTogglePopup}></span>
            </div>
            <div className="popup-content">
              <div className="detalhes-container">
              <table>
                <tbody>
                  <tr>
                    <td>Descrição do campo</td>
                    <td>{infoData.descricao}</td>
                  </tr>
                  {renderDetalhes()}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  ) : null;
};

export default InfoTooltip;
