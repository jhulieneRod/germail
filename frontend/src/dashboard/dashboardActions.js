import axios from 'axios';
import consts from '../consts';
const BASE_URL = consts.API_URL;

export function getList() {
    const request = axios.get(`${BASE_URL}/dashboard/widgets`);
    return {
        type: 'DASHBOARD_FETCHED',
        payload: request
    }
}