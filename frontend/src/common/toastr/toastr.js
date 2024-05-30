import { toastr } from 'react-redux-toastr'

/* disableCloseButtonFocus: true -> isso faz com ele não robe o focus jogando para o botão fechar */
export async function tsSuccess(text = ''){
    toastr.success('Sucesso', text, { disableCloseButtonFocus: true } );
}

export async function tsWarning(text = ''){
    toastr.warning('Alterta', text, { disableCloseButtonFocus: true } );
}

export async function tsError(text = ''){
    toastr.error('Erro', text, { disableCloseButtonFocus: true } );
}