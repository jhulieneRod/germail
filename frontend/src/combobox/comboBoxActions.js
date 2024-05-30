import axios from 'axios'
import consts from '../consts';
const BASE_URL = consts.API_URL;

export function getListComboBoxAll() {
    const request = axios.get(`${BASE_URL}/combobox`)

    return {
        type: 'COMBOBOX_FETCHED',
        payload: request
    }
}
