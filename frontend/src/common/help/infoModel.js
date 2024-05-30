
const criarInfo = (nome, descricao, detalhes) => {
    return {
      nome: nome || "Nome do Campo",
      descricao: descricao || "Descrição do Campo",
      detalhes: detalhes || {}
    };
  };
  
  export default criarInfo;
  