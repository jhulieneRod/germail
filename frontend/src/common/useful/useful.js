import { parseISO, format, isValid } from 'date-fns';

export function strFloat(value) {// converte string para um float válido, e converte um value pt-br para padrão do banco e do js
    let negativo = false;
    if (typeof value === "string") {
        if (value[0] === '-') {
            negativo = true;
            value = value.replace('-', '');
        }

        if (value.indexOf(',') >= 0)
            value = (value) ? parseFloat(('0' + value).toString().replace(/\./g, '').replace(',', '.')) : 0;
        else
            value = (value) ? parseFloat(('0' + value).toString()) : 0;
    }

    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value))// valida float com decimal com erro tipo e+15 ou e-15
        return isNaN(value) ? 0 : ((negativo) ? (value == 0) ? 0 : value * -1 : value);
    return 0;
    // return isNaN(value) ? 0 : ((negativo) ? value * -1 : value);
}

export function formatFloatPtBr(value, digits = 2) {// devolve uma strig formatada no padrão PT-BR
    let numberFormat = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
    return numberFormat.format(strFloat(value));
}

export function dateFilter(filter, row) {// devolve uma strig formatada no padrão PT-BR
    if (isValid(parseISO(row[filter.id]))) {
        let dataValue = format(parseISO(row[filter.id]), 'dd/MM/yyyy');

        if (filter.value.indexOf('-') >= 0) {
            let data_ini = filter.value.split('-');
            let data_fim = data_ini[1];
            data_ini = data_ini[0];

            let data_ini_aux = data_ini.split('/');
            data_ini = `${data_ini_aux[2]}-${data_ini_aux[1]}-${data_ini_aux[0]}`;

            let data_fim_aux = data_fim.split('/');
            data_fim = `${data_fim_aux[2]}-${data_fim_aux[1]}-${data_fim_aux[0]}`;

            // entre duas datas
            if ((isValid(parseISO(data_ini))) && (isValid(parseISO(data_fim))))
                return (parseISO(row[filter.id]) >= parseISO(data_ini)) && (parseISO(row[filter.id]) <= parseISO(data_fim));
            else// maior que data inicial
                if (isValid(parseISO(data_ini)))
                    return parseISO(row[filter.id]) >= parseISO(data_ini);
                else// menor que data final
                    if (isValid(parseISO(data_fim)))
                        return parseISO(row[filter.id]) <= parseISO(data_fim);
        } else {

            return dataValue.indexOf(filter.value) >= 0;
        }
    }
}

export function getConfig(key,field){
    var _key = localStorage.getItem(key);
    if (_key != null) {
        _key = JSON.parse(_key);
        return _key[field];
    }
    return null;
}

export function downloadTextFile(filename, text) {
    var element =  document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export function preencherZeroEsquerda(value, totalWidth, paddingChar) {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
};

// downloadTextFile('eventos_variaveis.txt', '0;0001;000;000009001;0075;0000;0000000435;00000001750;\r\n0;0001;000;000009001;0075;0000;0000000435;00000001750;');