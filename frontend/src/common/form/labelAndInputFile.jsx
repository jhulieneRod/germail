import React, { Component } from 'react';
import Grid from '../layout/grid';


window.$('input[type=file]').change(function () {
    var t = window.$(this).val();
    var labelText = 'File : ' + t.substr(12, t.length);
    window.$(this).prev('label').text(labelText);
})


class labelAndInputFile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            labelFile: this.props.labelFile
        }
    }

    render() {
        // const { input } = this.props
        // const onInputChange = (e) => {
        //     e.preventDefault();
        //     const files = [...e.target.files];            
        //     this.setState({labelFile : files[0].name});
        //     // this.props.labelFile = files[0].name;

        //     input.onChange(files);
        // };
        return (
            <Grid cols={this.props.cols} style={this.props.colsStyle}>
                <div className='form-group form-group-sm'>
                    <label className='label-gt' htmlFor={this.props.name}>{this.props.label}</label>
                    <div className='control-fileupload'>
                        {/* <label className='label-gt' htmlFor={this.props.name}>{this.state.labelFile}</label> */}
                        <label className='label-gt' htmlFor={this.props.name}>{this.props.labelFile}</label>
                        <input
                            className={`form-control ${this.props.meta.touched && ((this.props.meta.error && 'form-valid') || (this.props.meta.warning && 'form-valid'))}`}
                            type={'file'}
                            id={this.props.id}
                            tabIndex={(this.props.readOnly) ? -1 : this.props.tabIndex}
                            onChange={this.props.input.onChange}
                            // onChange={onInputChange}
                            accept={this.props.accept}
                            disabled={(this.props.disabled !== undefined ? this.props.disabled : false)}
                            multiple={this.props.multiple}
                        />
                    </div>
                    {this.props.meta.touched && ((this.props.meta.error && <span className='msg_span'>{this.props.meta.error}</span>) || (this.props.meta.warning && <span className='msg_span'>{this.props.meta.warning}</span>))}

                </div>
            </Grid>
        )
    }
}

export default labelAndInputFile;

// const labelAndInputFile = props => (
//     <Grid cols={this.props.cols} style={this.props.colsStyle}>
//         <div className='form-group form-group-sm'>
//             <label className='label-gt' htmlFor={this.props.name}>{this.props.label}</label>
//             <input 
//                 className={`form-control ${this.props.meta.touched && ((this.props.meta.error && 'form-valid') || (this.props.meta.warning && 'form-valid'))}`}
//                 type={'file'}
//                 id={this.props.id}
//                 tabIndex={(this.props.readOnly) ? -1 : props.tabIndex}
//                 onChange={this.props.onChange}
//                 accept={this.props.accept}
//             />
//             {this.props.meta.touched && ((this.props.meta.error && <span className='msg_span'>{this.props.meta.error}</span>) || (this.props.meta.warning && <span className='msg_span'>{this.props.meta.warning}</span>))}

//         </div>
//     </Grid>
// )

// export default labelAndInputFile;