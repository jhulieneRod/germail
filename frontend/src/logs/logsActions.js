import axios from 'axios'
import consts from '../consts';
const BASE_URL = consts.API_URL;

export function getLogsAvisos(filtro) {
    const request = axios.post(`${BASE_URL}/logs/avisos`,filtro);
    return {
        type: 'LOGSAVISOS_FETCHED',
        payload: request
    }
}