import axios from 'axios'
import { tsSuccess, tsError } from '../common/toastr/toastr';
// import { reset as resetForm, initialize } from 'redux-form'
import { initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions'
import consts from '../consts';
const BASE_URL = consts.API_URL;
const cad_key = 'CAD_USUARIO';

const INITIAL_VALUES = () => ({
    tipo: 1,
    x_ativo: 1
});

export function getList() {
    const request = axios.get(`${BASE_URL}/usuarios`)

    return {
        type: 'USUARIO_FETCHED',
        payload: request
    }
}

export function getTelaList(idUsuario = 0) {
    const request = axios.get(`${BASE_URL}/usuarios/telas/${idUsuario}`)
    return {
        type: 'USUARIOTELA_FETCHED',
        payload: request
    }
}

export function create(values, dispatch, props) {
    return submit(values, 'post');
}

export function update(values, dispatch, props) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete');
}

export function removerUsuarioCliente(values, callBack) {

    return dispatch => {
        axios.delete(`${BASE_URL}/usuarios/clientes/${values.cliente_id}/${values.usuario_id}`, values)
            .then(resp => {
                tsSuccess('Operação realizada com sucesso.');
                dispatch(callBack());
            })
            .catch(e => {
                // console.log('e.response.data.errors -> ',e);
                if ((e.response) && (e.response.data) && (e.response.data.errors))
                    e.response.data.errors.forEach(error => tsError(error))
            })
    }
}

function submit(values, method) {

    return dispatch => {
        const id = values.id ? values.id : ''
        axios[method](`${BASE_URL}/usuarios/${id}`, values)
            .then(resp => {
                tsSuccess('Operação realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                // console.log('e.response.data.errors -> ',e);
                e.response.data.errors.forEach(error => tsError(error))
            })
    }
}

export function showUpdate(usuario) {
    return [
        showTabs(['tabUpdateUsuario'], cad_key),
        selectTab('tabUpdateUsuario', cad_key),
        initialize('usuarioForm', usuario) 
    ]
}

export function init(isPost = false) {

    return [
        showTabs(['tabListUsuario', 'tabCreateUsuario'], cad_key),
        selectTab((isPost) ? 'tabCreateUsuario' : 'tabListUsuario', cad_key),
        getList(),
        getTelaList(),
        initialize('usuarioForm', INITIAL_VALUES())
    ]
}