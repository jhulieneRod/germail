import If from '../operator/if';

const buttonLink = props => (
    <button {...props}
        type='button'
        className={`button_link_a ${(props.className) ? props.className : ''}`}
        disabled={props.disabled}
    >
        <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span> <If condicao={props.iconright}><i className={`fa fa-${props.iconright}`}></i></If>
    </button >
)

export default buttonLink;