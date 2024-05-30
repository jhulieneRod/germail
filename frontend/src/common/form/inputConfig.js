import { strFloat } from '../useful/useful';
// não permite valor vazio
export const required = value => (((value === null) || (value === '') || (value === undefined)) ? 'Obrigatório' : undefined);

// não permite valor vazio e nem valof menor ou igual a zero
export const requiredZero = value => (((parseInt(value) <= 0) || (value === null) || (value === '') || (value === undefined)) ? 'Obrigatório' : undefined);


export const requiredSelect = value => (((value === 'selecione') || (value === undefined)) ? 'Obrigatório' : undefined);

// export const requiredEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'E-mail inválido' : undefined;

export const requiredEmail = value => {
    if (!value) return 'Obrigatório';

    const regExp = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9.-]+\.)+[A-Za-z]+$/;
    if (regExp.test(value)) {
        return undefined
    } else {
        return 'E-mail inválido';
    }
}

export const requiredPassword = value => {
    if (!value) return 'Obrigatório';

    const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/;
    if (regExp.test(value)) {
        return undefined
    } else {
        return 'Mínimo de oito caracteres, pelo menos uma letra, um número e um caractere especial(@$.!%*#?&)';
    }
}

export const requiredNumFilter = value => {
    if (!value) return undefined;
    const regExp = /^[0-9,]*$/;
    if ((regExp.test(value)) && (value.toString().indexOf(',,') < 0) && (value[0] !== ',') && (value[value.length - 1] !== ',')) {
        return undefined
    } else {
        return 'Filtro inválido. Informe só números separados por vírgula';
    }
}

export const requiredTextFilter = value => {
    if (!value) return undefined;
    const regExp = /^[A-Za-z0-9,]*$/;
    // const regExpAz = /^[A-Za-z,]*$/;
    if ((regExp.test(value)) && (value.toString().indexOf(',,') < 0) && (value[0] !== ',') && (value[value.length - 1] !== ',')) {
        return undefined
    } else {
        return 'Filtro inválido. Informe só números separados por vírgula';
    }
}

export const requiredCompet = value => {
    if ((!value) || (value === '00/0000'))
        return 'Obrigatório';

    let month = value.slice(0, 2);

    if (month > 12)
        return 'Competência inválida';
}

export const onlyNums = value => value.replace(/[^\d]/g, '');

export const onlyNumsPositive = value => (strFloat(value) < 0) ? 0 : value; // tem que ser assim para funcionar no componente LabelAndInputNumericFormat

export const onlyNums0a100 = value => (strFloat(value) < 0) ? 0 : (strFloat(value) > 100) ? 100 : value;

export const onlyDecimal = value => {
    // if (!value) return;

    const regExp = /^[+-]?\d*(?:[.,]\d*)?$/;
    if (regExp.test(value)) {
        return value.replace(',', '.')
    } else {
        let valueValid = value.replace(',', '.').replace('--', '-');
        valueValid = valueValid.replace(/[^\d.,-]/g, '');// tem que ser separado em outra linha                             

        return isNaN(parseFloat(valueValid)) ? value.replace(/[^\d]/g, '') : parseFloat(valueValid);
    }
}

export const onlyNumFilter = value => {
    // if (!value) return;

    const regExp = /^[+-]?\d*(?:[,]\d*)?$/;
    if (regExp.test(value)) {
        return value
    }
}

export const onlyCompDate = (value, prevValue) => {

    const valueOnlyNumbers = value.replace(/[^\d]/g, '');

    let month = valueOnlyNumbers.slice(0, 2);
    // const day = valueOnlyNumbers.slice(2, 4);
    const year = valueOnlyNumbers.slice(2, 6);

    if (month > 12) month = 12;
    if (month === '00') month = '01';

    if (valueOnlyNumbers.length < 2) return `${month}`;
    if (valueOnlyNumbers.length === 2) return `${month}/`;
    if (valueOnlyNumbers.length <= 6) return `${month}/${year}`;

    if (valueOnlyNumbers.length > 6) return `${month}/${year}`.substr(0, 7);
}

export const onlyNumsMin = (value, min) => (strFloat(value) >= strFloat(min)) ? value.replace(/[^\d]/g, '') : min;



export const setUpperCase = value => value.toUpperCase();