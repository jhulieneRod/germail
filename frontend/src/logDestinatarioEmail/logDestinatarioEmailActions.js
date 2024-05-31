import axios from 'axios'
import consts from '../consts';
const BASE_URL = consts.API_URL;

export function getList() {
    const request = axios.get(`${BASE_URL}/log_destinatario_email/`);

    return {
        type: 'LOG_DESTINATARIO_EMAIL_FETCHED',
        payload: request
    }
}