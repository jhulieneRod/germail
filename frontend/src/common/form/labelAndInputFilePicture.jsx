import React, { Component } from 'react';
import Grid from '../layout/grid';


// window.$('input[type=file]').change(function () {
//     var t = window.$(this).val();
//     var labelText = 'File : ' + t.substr(12, t.length);
//     window.$(this).prev('label').text(labelText);
// })

const labelAndInputFilePicture = props => {
    return (
        <Grid cols={props.cols} style={props.colsStyle}>
            <div className='form-group form-group-sm'>
                <label className='label-gt' htmlFor={props.name}>{props.label}</label>
                <label className="picture" htmlFor={props.name} tabIndex="0">
                    <input
                        // {...props.input}
                        type='file'
                        // className='picture_input'
                        id={props.id}
                        tabIndex={(props.readOnly) ? -1 : props.tabIndex}
                        onChange={props.input.onChange}
                        accept={props.accept}
                        disabled={(props.disabled !== undefined ? props.disabled : false)}
                    />
                    <span className="picture__image">Escolha uma imagem</span>
                </label>
            </div>
        </Grid>
    )
}

export default labelAndInputFilePicture;