const knex = require('../../config/database');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getListDataBase = async () => {
    let result = {
        data: [],
        success: false,
        error: null
    }
    const sqlCommand = `select base_nome
                        from empresa
                        where x_ativo = 1
                          and base_nome is not null`;

    await knex.raw(sqlCommand, [])
        .then((dados) => {
            if (dados && dados[0].length) {
                result.data = dados[0]
                result.success = true;
            }
        })
        .catch(function (e) {
            console.error('ListDataBase Error: ', e);
            result.error = e;
        });

    return result;
}

// const setAvisosSemanal = async () => {

//     let databaseList = await getListDataBase();

//     for (const key in databaseList.data) {
//         const database = databaseList.data[key];
//         const totalAvisos = await getTotalAvisos(database.base_nome);

//         if (totalAvisos.success) {
//             console.log('TOTAL DA SEMANA = ', database.base_nome, ' total: ', totalAvisos);
            
//         }
//     }
// }

async function execAutoRun() {

    console.log('Iniciando Auto Run');
    let diaSemana = new Date().getDay();

    let loop = 1; // loop ligado
    while (loop == 1) {

        // if (diaSemana === 2) {// so executa esse processo na "terça feira = 2". Obs começa de Domingo = 0
        if (diaSemana === 0) {// so executa esse processo no Domingo = 0
            console.log('[Auto Run] -> Buscando lista de bases');
            let databaseList = await getListDataBase();
            await sendEmailSemanalAvisos(databaseList);
            console.log('[Auto Run] -> RESUMO DE AVISOS SEMANAL ENVIADO COM SUCESSO!');
        }


        // await sleep(30000);
        await sleep(86400000);// a cada 24 horas
    }

}

// execAutoRun();