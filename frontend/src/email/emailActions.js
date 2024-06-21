import axios from 'axios'
import { tsSuccess, tsError } from '../common/toastr/toastr';
import { initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions'
import consts from '../consts';
const BASE_URL = consts.API_URL;
const cad_key = 'CAD_EMAIL';

const INITIAL_VALUES = () => ({});

export function getList() {
    const request = axios.get(`${BASE_URL}/email`)

    return {
        type: 'EMAIL_FETCHED',
        payload: request
    }
}

export function getListEmail(callback = () => {}) {
    axios.get(`${BASE_URL}/email/`)
    .then((resp) => {
        callback(resp.data);
    });
}

export function getConteudoEmail(id, callback = () => {}) {
    axios.get(`${BASE_URL}/email_visualizar/${id}`)
    .then((resp) => {
        callback(resp.data);
    });
}

export function create(values, dispatch, props) {
    return submit(values, 'post', 'Email Incluído com Sucesso!');
}

export function update(values, dispatch, props) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete', 'Email Deletado com Sucesso!');
}

function submit(values, method, msg = 'Email Alterado com sucesso!') {
    return dispatch => {
        const id = values.id ? values.id : ''
        axios[method](`${BASE_URL}/email/${id}`, values)
            .then(resp => {
                tsSuccess(msg);
                dispatch(init())
            })
            .catch(e => {
                // console.log('e.response.data.errors -> ',e);
                e.response.data.errors.forEach(error => tsError(error))
            })
    }
}

export function enviaEmail(email) {
    return dispatch => {
        axios['post'](`${BASE_URL}/envia_email/${email}`)
            .then(resp => {
                tsSuccess('E-mail Enviado com Sucesso!');
                dispatch(init())
            })
            .catch(e => {
                // console.log('e.response.data.errors -> ',e);
                e.response.data.errors.forEach(error => tsError(error))
            })
    }
}

export function showUpdate(email) {
    return [
        showTabs(['tabUpdateEmail'], cad_key),
        selectTab('tabUpdateEmail', cad_key),
        initialize('emailForm', email) 
    ]
}

export function showVisualizar(email) {
    return [
        showTabs(['tabVisualizarEmail'], cad_key),
        selectTab('tabVisualizarEmail', cad_key) 
    ]
}

export function init(isPost = false) {

    return [
        showTabs(['tabListEmail', 'tabCreateEmail'], cad_key),
        selectTab((isPost) ? 'tabCreateEmail' : 'tabListEmail', cad_key),
        getList(),
        initialize('emailForm', INITIAL_VALUES())
    ]
}