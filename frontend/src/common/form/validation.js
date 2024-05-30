export function validaId(list, field, value) {
    for (const key in list) {
        if ((list[key][field]) == (value))
            return false
    }
    return true;
}

export function validKeys(list, fieldList, valueList) {    
    for (const key in list) {
        let existsKey = true;
        for (let idx = 0; idx < fieldList.length; idx++) {
            const field = fieldList[idx];
            const value = valueList[idx];

            if ((list[key][field]) != (value))
                existsKey = false;
        }

        if (existsKey)
            return false
    }

    return true;
}

export function getMaxCodigo(list, field) {

    let maxCodigo = [];
    if ((list) && (list.length > 0))
        maxCodigo = list.reduce((max, item) => (max[field] > item[field]) ? max : item);// busca o maior valor do field no array

    let maxId = (maxCodigo[field]) ? maxCodigo[field] + 1 : 1;

    return maxId;
}