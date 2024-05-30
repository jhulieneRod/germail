import swal from 'sweetalert2';

export async function msgQuestion(title, text = '') {
    let result = {};
    let htmlText = `<h5 style="font-size: 16px">${text}</h5>`;
    await swal.fire({
        title: title,
        // html: `<h4 style='text-align:left'>${text}</h4>`,//<- usado para alinhar o texto a esquerda
        html: htmlText,
        icon: 'question',
        showCancelButton: true,
        // confirmButtonColor: 'red',
        confirmButtonText: 'Sim',
        cancelButtonColor: '#f39c12',
        cancelButtonText: 'Não',
        // cancelButtonClass : '',
        focusCancel: true,
        toast: false
        
    }).then((data) => {
        result = data;
    });

    return result;
}


export async function msgWarning(text) {
    let result = {};
    await swal.fire({
        title: text,
        icon: 'warning',
        // showCancelButton: true,
        confirmButtonColor: 'primary',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Não'
    }).then((data) => {
        result = data;
    });

    return result;
}

export async function msgError(text) {
    let result = {};
    await swal.fire({
        title: text,
        icon: 'error',
        // showCancelButton: true,
        confirmButtonColor: 'primary',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Não',
        textAlign: 'left'
    }).then((data) => {
        result = data;
    });

    return result;
}
