import React, { Component } from 'react';

class InputFile extends Component {
    render() {
      const { input,dataAllowedFileExtensions } = this.props
      const onInputChange = (e) => {
          e.preventDefault();
          const files = [...e.target.files];
          input.onChange(files);
      };
      return (
        <div>
          <input type="file"
                 onChange={onInputChange}
                 data-allowed-file-extensions={dataAllowedFileExtensions}               />
        </div>
      )
    }
  }

export default InputFile;