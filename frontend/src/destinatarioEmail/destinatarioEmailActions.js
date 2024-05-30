import axios from 'axios'
import { tsSuccess, tsError } from '../common/toastr/toastr';
import { showTabs, selectTab } from '../common/tab/tabActions'
import consts from '../consts';
const BASE_URL = consts.API_URL;
const cad_key = 'CAD_EMAIL';

const INITIAL_VALUES = () => ({});

export function getList(id_email) {
    const request = axios.get(`${BASE_URL}/destinatario_email/${id_email}`);

    return {
        type: 'DESTINATARIO_EMAIL_FETCHED',
        payload: request
    }
}

export function create(values, dispatch, props) {
    return submit(values, 'post', 'Destinatário Incluído com Sucesso!');
}

export function update(values, dispatch, props) {
    return submit(values, 'put', 'Destinatário Alterado com Sucesso!');
}

export function remove(values) {
    return submit(values, 'delete', 'Destinatário Deletado com Sucesso!');
}

function submit(values, method, msg = 'Destinatário Incluído com Sucesso!') {
    return dispatch => {
        const id = values.id ? values.id : ''
        const id_email = values.id_email ? values.id_email : ''
        axios[method](`${BASE_URL}/destinatario_email/${id}`, values)
            .then(resp => {
                tsSuccess(msg);
                dispatch((id_email) ? [getList(id_email)] : [])
            })
            .catch(e => {
                // console.log('e.response.data.errors -> ',e);
                e.response.data.errors.forEach(error => tsError(error))
            })
    }
}

export function showDestinatarios(id_email) {
    return [
        showTabs(['tabDestinatariosEmail'], cad_key),
        selectTab('tabDestinatariosEmail', cad_key),
        getList(id_email)
    ]
}