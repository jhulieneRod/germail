import axios from 'axios';
import consts from '../consts';
const BASE_URL = consts.API_URL;
// const BASE_URL = 'http://localhost:3003/api'

export function getChartAvisos() {
    const request = axios.get(`${BASE_URL}/dashboard/avisos`);
    return {
        type: 'CHARTAVISOS_FETCHED',
        payload: request
    }
}

export function getWidgets() {
    const request = axios.get(`${BASE_URL}/dashboard/widgets`);
    return {
        type: 'WIDGETS_FETCHED',
        payload: request
    }
}

export function getWidgetsPesquisar(filtro) {
    const request = axios.post(`${BASE_URL}/dashboard/widgets/pesquisar`, filtro);
    return {
        type: 'WIDGETS_PESQUISAR_FETCHED',
        payload: request
    }
}


// export function getValorConvenio(filtro) {
//     const request = axios.post(`${BASE_URL}/lancamentos/dashboard/convenio`,filtro);
//     return {
//         type: 'DASHBOARDCONVENIO_FETCHED',
//         payload: request
//     }
// }

// export function getValorEspecialidade(filtro) {
//     const request = axios.post(`${BASE_URL}/lancamentos/dashboard/especialidade`,filtro);
//     return {
//         type: 'DASHBOARDESPECIALIDADE_FETCHED',
//         payload: request
//     }
// }
