import React from 'react';

const input = props => (
    
            <input {...props.input} className={`form-control ${props.meta.touched && ((props.meta.error && 'form-valid') || (props.meta.warning && 'form-valid'))}`}
                style={props.style}
                placeholder={props.placeholder}
                readOnly={props.readOnly}
                type={props.type}
                id={props.id}
                min={props.min}// não funciona
                max={props.max}// não funciona
                maxLength={props.maxLength}
                step={props.step}
                // value={props.value}
                // value={props.defaultValue}
                // defaultValue={props.defaultValue}
                // onBlur={props.onBlur}
                onKeyDown={props.onKeyDown}
                autoFocus={props.autoFocus}
                // dataindex={props.index}
                // onChange={props.onChange}

                ref={props.setFieldToBeFocused}// carrega uma funcao para atribuir o input ao ref e permitir o focus
                onKeyUp={props.onKeyUp}
                tabIndex={(props.readOnly) ? -1 : props.tabIndex}
                accept={props.accept}
                // onFocus={handleFocus}
                
                // data-proximo={props.proximo}// usado para entertab
            />            
)

export default input;