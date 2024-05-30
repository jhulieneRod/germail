import If from '../operator/if';

const button = props => (
    <button {...props}
        type={props.type}
        className={`btn btn-${props.className} btn-sm`}
        disabled={props.disabled}
    >
        <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span> <If condicao={props.iconright}><i className={`fa fa-${props.iconright}`}></i></If>
    </button >
)

export default button;