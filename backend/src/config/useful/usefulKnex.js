async function existData(knex, tableName, data, keyList) {

    let result = false;
    let columns = keyList.toString();
    let filter = '';

    for (let i = 0; i < keyList.length; i++) {
        const field = keyList[i];
        if (filter === '')
            filter += ' where ' + field + ' = ' + data[field]
        else
            filter += ' and ' + field + ' = ' + data[field];
    }

    let sqlCommand = `select ${columns} from ${tableName} ${filter}`;

    await knex.raw(sqlCommand)
        .then((dados) => {
            // if (dados[0].length)
            result = dados[0].length;
        })
        .catch(function (error) {
            console.error('Erro[existData]:' + error);
        });

    return result;
}

function mountListUpdate(tableName, data, keyList) {

    let columns = keyList.toString();
    let filter = '';

    for (let i = 0; i < keyList.length; i++) {
        const field = keyList[i];
        if (filter === '')
            filter += ' where ' + field + ' = ' + data[field]
        else
            filter += ' and ' + field + ' = ' + data[field];
        delete data[field]; // apaga o campo pra não fazer parte dos valores atualizados no update
    }

    let values = [];

    for (const field in data) {
        values.push(' ' + field + ' = "' + data[field] + '" ');
    }

    let sqlCommand = `update ${tableName} set  ${values.toString()} ${filter}`;

    return sqlCommand;

}

async function insertData(knex, tableName, dataList, keyList) {
    await knex(tableName)
        .insert(dataList)
        .onConflict(keyList)
        .ignore()
        .then((result) => {
            //
        })
        .catch(function (error) {
            if (error.sqlMessage)
                console.log('Erro[insertData] :' + error.sqlMessage);
            // console.error('Erro[insertData] :' + error.sqlMessage);
        });
}

async function updateData(knex, dataList) {
    try {
        await knex.transaction(async function (trx) {
            for (let idx = 0; idx < dataList.length; idx++) {
                const sqlUpdate = dataList[idx];
                await trx.raw(sqlUpdate);
            }
        })
    } catch (error) {
        console.error(error);
    }
}

async function knexSaveList(knex, tableName, dataList, keyList) {

    let result = {
        success: false,
        error: null
    }

    let listInsert = [];
    let listUpdate = [];

    // console.log('dataList -->', keyList);

    for (let idx = 0; idx < dataList.length; idx++) {
        const data = dataList[idx];
        let ifExeist = await existData(knex, tableName, data, keyList);

        if (ifExeist)
            listUpdate = [...listUpdate, mountListUpdate(tableName, data, keyList)];
        else
            listInsert = [...listInsert, data];
        // if (!listInsert.includes(data))// não vale a pena, demora muito
        //     listInsert = [...listInsert, data];
    }

    if (listInsert.length)
        await insertData(knex, tableName, listInsert, keyList);

    if (listUpdate.length)
        await updateData(knex, listUpdate);

    result.success = true;

    return result;
}

async function knexSaveListParts(knex, tableName, dataList, keyList, limit = 10000) {

    let result = {
        success: false,
        error: null
    }
    let countLimit = 0;
    let listInsert = [];
    let listUpdate = [];

    for (let idx = 0; idx < dataList.length; idx++) {
        const data = dataList[idx];
        let ifExeist = await existData(knex, tableName, data, keyList);

        if (ifExeist)
            listUpdate = [...listUpdate, mountListUpdate(tableName, data, keyList)];
        else
            listInsert = [...listInsert, data];

        // essa rotina comita pacotes de lista com no máximo o limit por vez
        countLimit++;
        if (countLimit === limit) {
            if (listInsert.length)
                await insertData(knex, tableName, listInsert, keyList);

            if (listUpdate.length)
                await updateData(knex, listUpdate);

            countLimit = 0;
            listInsert = [];
            listUpdate = [];
        }
    }

    if (listInsert.length)
        await insertData(knex, tableName, listInsert, keyList);

    if (listUpdate.length)
        await updateData(knex, listUpdate);

    result.success = true;

    return result;
}

// async function knexSaveList(knex, tableName, dataList, keyList) {

//     let result = {
//         success: false,
//         error: null
//     }

//     let listInsert = [];
//     let listUpdate = [];

//     for (let idx = 0; idx < dataList.length; idx++) {
//         const data = dataList[idx];
//         let ifExeist = await existData(knex, tableName, data, keyList);

//         if (ifExeist)
//             listUpdate = [...listUpdate, mountListUpdate(tableName, data, keyList)];
//         else
//             listInsert = [...listInsert, data];
//     }

//     // console.log('listInsert',listInsert);

//     // if (listInsert.length)
//     //     await insertData(knex, tableName, listInsert);

//     // if (listUpdate.length)
//     //     await updateData(knex, listUpdate);

//     result.success = true;

//     return result;
// }

module.exports = { knexSaveList, knexSaveListParts };