import React, { useState } from 'react';
import LinhaAnexoGrid from './linhaAnexoGrid';
import { getListFromTipo } from '../../tipo_documento/tipoDocumentoActions';

const init = {
    status: 0
}

const AnexoGrid = (props) => {

    const style = {
        minWidth: '0',
        padding: '10px',
        margin: '10px'
    };

    const modelLinha = {
        id: '',
        tipo_anexo_documento_id: '',
        file_anexo: [],
        descricao: '',
        descricaoTipo: '',
        idLinha: Date.now()
    };

    const [linhasGrid, setLinhasGrid] = useState([]);
    const [loadTipos, setLoadTipos] = useState(props.filtraTipo);

    const removeLinha = (index) => {
        setLinhasGrid(prevLinhasGrid => {
            const novasLinhasGrid = [...prevLinhasGrid];
            novasLinhasGrid.splice(index, 1);
            if(novasLinhasGrid.length < 1){
                novasLinhasGrid.push(modelLinha)
            }
            return novasLinhasGrid;
        });
    };

    const atualizaLinha = (index, linha) => {
        const novasLinhasGrid = [...linhasGrid];
        novasLinhasGrid[index] = linha;
        setLinhasGrid(novasLinhasGrid);

        if(props.onChangeGrid){
            props.onChangeGrid(novasLinhasGrid);
        }
    };

    const addLinha = () => {
        setLinhasGrid(prevLinhasGrid => [...prevLinhasGrid, { ...modelLinha }]);
    };

    const criaLinhasFromTipo = () => {
        if(!loadTipos){
            if(!init.status){
                addLinha();
                init.status = 1;
            }
            return;
        }

        let aLinhas = [];

        getListFromTipo(props.filtraTipo).then(
            (dados) => {
                let tipos = dados.data;
                if(!tipos.length){
                    if(!init.status){
                        addLinha();
                        init.status = 1;
                    }
                    setLoadTipos(false);
                    return;
                }
                tipos.map((tipo) => {
                    return aLinhas.push({...modelLinha, tipo_anexo_documento_id: tipo.id, descricao: tipo.descricao, descricaoTipo: tipo.descricao})
                })
                setLinhasGrid(aLinhas);
                setLoadTipos(false);
            }
        )
    };

    return (
        <fieldset style={style}>
            {criaLinhasFromTipo()}
            {linhasGrid.map((linha, index) => (
                <LinhaAnexoGrid
                    key={index}
                    index={index}
                    linha={linha}
                    idLinha={linha.idLinha}
                    onAddLinha={addLinha}
                    onRemoveLinha={() => removeLinha(index)}
                    onChangeLinha={atualizaLinha}
                    ocultaDescricao={props.ocultaDescricao}
                    desabilitaTipo={props.desabilitaTipo}
                    habilitaEdicaoLinhas={props.habilitaEdicaoLinhas}
                    ocultaBotoesEdicao={props.ocultaBotoesEdicao}
                />
            ))}
        </fieldset>
    );
};

export default AnexoGrid;
