import React, { useState } from 'react';
import TipoDocumentoFieldSearch from '../../tipo_documento/tipoDocumentoFieldSearch';
import { Field } from 'redux-form';
import labelAndInputFile from '../form/labelAndInputFile';
import labelAndInput from '../form/labelAndInput';
import { msgWarning } from '../msg/msg';
import { required } from '../form/inputConfig';
import { Button } from 'react-bootstrap';
import IF from '../operator/if';

const LinhaAnexoGrid = (props) => {

    const style = {
        padding: '10px',
        borderBottom: '1px solid silver'
    };

    const [fileName, setFileName] = useState('Selecione um arquivo (*.jpg,*.jpeg,*.png)');
    const [descricaoTipo, setDescricaoTipo] = useState(props.linha.descricaoTipo || '');

    const atualizaTipoDocumento = (row) => {
        let tipo = '';
        let descricao = '';
        if(row){
            tipo = row.id;
            descricao = row.descricao;
        }
        let linhaAtualizada = {...props.linha, tipo_anexo_documento_id: tipo};
        props.onChangeLinha(props.index, linhaAtualizada);
        setDescricaoTipo(descricao);
    };

    const atualizaDescricao = (descricao) => {
        let linhaAtualizada = {...props.linha, descricao: descricao};
        props.onChangeLinha(props.index, linhaAtualizada);
    };

    const atualizaFile = (e) => {
        let file = e.target.files[0];

        if(file.size > 2000000){
            msgWarning('O arquivo possui tamanho superior a 2MB!');
            return;
        }

        let linhaAtualizada = {...props.linha, file_anexo: [file]};
        props.onChangeLinha(props.index, linhaAtualizada);
        setFileName(file.name);
    }

    const removeLinha = () => {
        if (props.index === 0 && props.qtdLinhas === 1) {
            // Se for a única linha, limpa os campos
            const linhaVazia = { tipo_anexo_documento_id: '', file_anexo: [], descricao: '', idLinha: Date.now() };
            props.onChangeLinha(props.index, linhaVazia);
        } else {
            // Remove a linha do estado
            props.onRemoveLinha(props.index);
        }
    };

    return (
        <div style={style}>
            <div style={{display:'flex'}}>
                <TipoDocumentoFieldSearch
                    name={'campo1_linha_'+props.idLinha}
                    data-desc={descricaoTipo}
                    onSelect={atualizaTipoDocumento}
                    onDescBlur={(row) => {
                        atualizaTipoDocumento(row);
                    }}
                    onChange={atualizaTipoDocumento}
                    label='Tipo de Documento'
                    readOnly={props.desabilitaTipo || false}
                    cols='3'
                    ocultaPesquisa
                />

                <Field
                    component={labelAndInputFile}
                    label="Arquivo"
                    labelFile={fileName}
                    name={'campo2_linha_'+props.idLinha}
                    type="file"
                    onChange={atualizaFile}
                    accept=".jpg,.jpeg,.png" as dasdf
                    multiple={false}
                    cols='9'
                    value={props.linha.file_anexo}
                />
            </div>
            <IF condicao={!props.ocultaDescricao}>
                <Field
                    name={'campo3_linha_'+props.idLinha}
                    maxLength={250}
                    component={labelAndInput}
                    label='Descrição'
                    cols='12'
                    validate={required}
                    onChange={(e) => {atualizaDescricao(e.target.value)}}
                    value={props.linha.descricao}
                />
            </IF>
            <IF condicao={!props.ocultaBotoesEdicao}>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Button onClick={() => {props.onAddLinha()}}><i className='fas fa-plus'></i></Button>
                    <Button onClick={removeLinha}><i className='fas fa-minus'></i></Button>
                </div>
            </IF>        
        </div>
    );
}

export default LinhaAnexoGrid;
