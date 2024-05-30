import React from 'react';
import InputGrid from './inputGrid';
import Button from '../form/button';

// NÃO FUNCIONA DIREITO QUANDO DIGITA O VALOR E SAI DO CAMPO, O REACT CUSA ERRO POIS FICOU UMA ESTRUTURA 
// COM MUITAS FUNÇÕES DENTRO UMA DA OUTRA E O REACT ESTABELECE UM LIMITE PARA CHAMA DE ARVORES DE FUNÇÃO CALLBACK
const InputSearchGrid_teste = props => {
    return (        
        <div className="input-group" >
            <div className="input-group-prepend mr-1">
                <InputGrid
                    className={`column_text_edit ${props.className}`}
                    type={props.type}
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    id={props.id}
                    value={props.value}

                    placeholder={props.placeholder}
                    // readOnly={(props.readOnly !== undefined) ? props.readOnly : true}                    
                    min={props.min}
                    max={props.max}
                    maxLength={props.maxLength}
                    step={props.step}
                    onBlur={props.onInputBlur}
                    onKeyDown={props.onKeyDown}
                    autoFocus={props.autoFocus}
                    onChange={props.onChange}
                />
                <Button
                    type='button'
                    className='primary input_search_btn_grid'
                    icon='search'
                    onClick={props.onBtnClick}
                    // disabled={(props.readOnly !== undefined) ? props.readOnly : true}
                />
            </div>
        </div>
    )
}

export default InputSearchGrid_teste;