import { tsSuccess, tsError } from '../common/toastr/toastr';
import axios from 'axios'
import consts from '../consts'
import { initialize } from 'redux-form';
import FormData from 'form-data';

const BASE_URL = consts.API_URL;
const INITIAL_VALUES = {}

export function login(values) {
    return submit(values, `${consts.OAPI_URL}/login`);
}

function submit(values, url) {
    debugger;
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                dispatch([
                    { type: 'USER_FETCHED', payload: resp.data }
                ])
            })
            .catch(e => {
                if ((e.response) && (e.response.data) && (e.response.data.errors))
                    e.response.data.errors.forEach(
                        error => tsError(error))
            })
    }
}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false }
}

export function validateToken(token) {
    return dispatch => {
        if (token) {
            axios.post(`${consts.OAPI_URL}/validateToken`, { token })
                .then(resp => {
                    dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.valid })
                })
                .catch(e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
        } else {
            dispatch({ type: 'TOKEN_VALIDATED', payload: false })
        }
    }
}

export function init() {
    return [
        initialize('alterarsenhaForm', INITIAL_VALUES)
    ]
}

export function updateSenha(values) {

    return dispatch => {
        axios.put(`${BASE_URL}/usuarios/senha/alterar`, values)
            .then(resp => {
                tsSuccess('Operação Realizada com sucesso.')
                // dispatch(init())
                dispatch(logout())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => tsError(error))
            })
    }
}

export function esqueceuSenha(values) {

    console.log('values', values);

    return dispatch => {
        axios.post(`${consts.OAPI_URL}/esqueciSenha`, values)
            .then(resp => {
                tsSuccess('E-mail enviado com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                console.log('e.response', e);
                // e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}