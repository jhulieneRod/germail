import axios from 'axios'
import { tsSuccess, tsError } from '../common/toastr/toastr';
import { initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions'
import consts from '../consts';
const BASE_URL = consts.API_URL;
const cad_key = 'CAD_CONFIGURACAO';

const INITIAL_VALUES = () => ({});

export function getList(tipo) {
    const request = axios.get(`${BASE_URL}/configuracao/${tipo}`);
    
    return {
        type: 'CONFIGURACAO_FETCHED',
        payload: request
    }
}

export function update(values, dispatch, props) {
    return dispatch => {
        axios['put'](`${BASE_URL}/configuracao/`, values)
            .then(resp => {
                tsSuccess('Configuração alterada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                // console.log('e.response.data.errors -> ',e);
                e.response.data.errors.forEach(error => tsError(error))
            })
    }
}

export function init() {
    return [
        showTabs(['tabConfEmail'], cad_key),
        selectTab('tabConfEmail', cad_key)
    ]
}