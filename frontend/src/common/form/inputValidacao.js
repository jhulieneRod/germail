export function validaSoNumeroInteiro(evento) { // aceita só números
// só funciona para teclado win linux
    if ((evento.keyCode !== 48) && (evento.keyCode !== 49) &&
        (evento.keyCode !== 50) && (evento.keyCode !== 51) &&
        (evento.keyCode !== 52) && (evento.keyCode !== 53) &&
        (evento.keyCode !== 54) && (evento.keyCode !== 55) &&
        (evento.keyCode !== 56) && (evento.keyCode !== 57) &&
        (evento.keyCode !== 96) && (evento.keyCode !== 97) &&
        (evento.keyCode !== 98) && (evento.keyCode !== 99) &&
        (evento.keyCode !== 100) && (evento.keyCode !== 101) &&
        (evento.keyCode !== 102) && (evento.keyCode !== 103) &&
        (evento.keyCode !== 104) && (evento.keyCode !== 105) &&
        (evento.keyCode !== 110) && (evento.keyCode !== 194) &&
        (evento.keyCode !== 8) && (evento.keyCode !== 9) &&
        (evento.keyCode !== 46) && (evento.keyCode !== 116) &&
        (evento.keyCode !== 16) && (evento.keyCode !== 17) &&
        (evento.keyCode !== 18) && (evento.keyCode !== 20) &&
        (evento.keyCode !== 35) && (evento.keyCode !== 36) &&
        (evento.keyCode !== 37) && (evento.keyCode !== 39) &&
        (evento.keyCode !== 113)) {
        evento.preventDefault();
        return true;
    }

}

// só funciona para teclado win linux
export function validaSoNumeroDecimal(evento) { // aceita só números

    if ((evento.keyCode !== 48) && (evento.keyCode !== 49) &&
        (evento.keyCode !== 50) && (evento.keyCode !== 51) &&
        (evento.keyCode !== 52) && (evento.keyCode !== 53) &&
        (evento.keyCode !== 54) && (evento.keyCode !== 55) &&
        (evento.keyCode !== 56) && (evento.keyCode !== 57) &&
        (evento.keyCode !== 96) && (evento.keyCode !== 97) &&
        (evento.keyCode !== 98) && (evento.keyCode !== 99) &&
        (evento.keyCode !== 100) && (evento.keyCode !== 101) &&
        (evento.keyCode !== 102) && (evento.keyCode !== 103) &&
        (evento.keyCode !== 104) && (evento.keyCode !== 105) &&
        (evento.keyCode !== 110) && (evento.keyCode !== 194) &&
        (evento.keyCode !== 8) && (evento.keyCode !== 9) &&
        (evento.keyCode !== 46) && (evento.keyCode !== 116) &&
        (evento.keyCode !== 16) && (evento.keyCode !== 17) &&
        (evento.keyCode !== 18) && (evento.keyCode !== 20) &&
        (evento.keyCode !== 35) && (evento.keyCode !== 36) &&
        (evento.keyCode !== 37) && (evento.keyCode !== 39) &&
        (evento.keyCode !== 108) && (evento.keyCode !== 188) &&
        (evento.keyCode !== 190) && (evento.keyCode !== 113)) {
        evento.preventDefault();
        return true;
    }

    if ((evento.key === ',') || (evento.key === '.')) {
        if ((evento.target.innerHTML.indexOf(',') >= 0) || (evento.target.innerHTML.indexOf('.') >= 0)) {
            evento.preventDefault();
            return true;
        }
    }

}

export function validaEnter(evento) {
    if (evento.keyCode === 13) {
        evento.preventDefault();
        return true;
    }
}
