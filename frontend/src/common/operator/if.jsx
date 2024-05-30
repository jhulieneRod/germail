const iff = props => {
    if(props.condicao) {
        return props.children
    } else {
        return false
    }
}

export default iff;