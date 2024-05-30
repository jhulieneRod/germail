import React, { Component } from 'react';

class DivEditableGridNumeric extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };
    }

    handleChange = (obj) => {
        const regExp = (this.props.dataType === 'integer') ? /^[0-9\b]+$/ : /^[+-]?\d*(?:[.,]\d*)?$/;

        if (regExp.test(obj.target.innerHTML)) {// se o valor for um numero
            this.setState({ value: obj.target.innerHTML });
        } else {            
            if (obj.target.innerHTML) {// se o valor não forna nada/null
                obj.target.innerHTML = this.state.value                
            } else {// se for um delete um um backspace e limpar o campo todo, tem que zerar o status
                this.setState({ value: null });
            }
        }
    }


    render() {
        return (
            <div
                {...this.props.input}
                style={this.props.style}
                className={this.props.className}
                contentEditable={this.props.contentEditable}
                inputMode={this.props.inputMode}
                suppressContentEditableWarning
                id={this.props.id}

                onFocus={e => {
                    let cell = e.target;
                    let range, selection;
                    if (document.body.createTextRange) {
                        range = document.body.createTextRange();
                        range.moveToElementText(cell);
                        range.select();
                    } else if (window.getSelection) {
                        selection = window.getSelection();
                        range = document.createRange();
                        range.selectNodeContents(cell);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }}
                onInput={this.handleChange}
                onBlur={this.props.onBlur}
                dangerouslySetInnerHTML={{
                    __html: this.props.value
                }}
                value={this.props.value}
            />
        )
    }
}

export default DivEditableGridNumeric;