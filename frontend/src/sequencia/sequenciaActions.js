import axios from 'axios'
import { tsSuccess, tsError } from '../common/toastr/toastr';
import { initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions'
import consts from '../consts';
const BASE_URL = consts.API_URL;
const cad_key = 'CAD_SEQUENCIA';

const INITIAL_VALUES = () => ({});

export function getList() {
    const request = axios.get(`${BASE_URL}/sequencia`)

    return {
        type: 'SEQUENCIA_FETCHED',
        payload: request
    }
}

export function create(values, dispatch, props) {
    return submit(values, 'post', 'Sequência Incluída com Sucesso!');
}

export function update(values, dispatch, props) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete', 'Sequência Deletada com Sucesso!');
}

function submit(values, method, msg = 'Sequência Alterada com sucesso!') {
    return dispatch => {
        const id = values.id ? values.id : ''
        axios[method](`${BASE_URL}/sequencia/${id}`, values)
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

export function showUpdate(sequencia) {
    return [
        showTabs(['tabUpdateSequencia'], cad_key),
        selectTab('tabUpdateSequencia', cad_key),
        initialize('sequenciaForm', sequencia) 
    ]
}

export function init(isPost = false) {

    return [
        showTabs(['tabListSequencia', 'tabCreateSequencia'], cad_key),
        selectTab((isPost) ? 'tabCreateSequencia' : 'tabListSequencia', cad_key),
        getList(),
        initialize('sequenciaForm', INITIAL_VALUES())
    ]
}

export function showFluxo() {
    return [
        showTabs(['tabFluxoSequencia'], cad_key),
        selectTab('tabFluxoSequencia', cad_key)
    ]
}

export function insereFluxo(id, callback = () => {}){
    return dispatch => {
        axios.post(`${BASE_URL}/fluxoSequencia/${id}`)
        .then(resp => {
            let fluxo = resp.data.fluxo;
            if(fluxo){
                let seqAlterada = {id, fluxo};
                axios.put(`${BASE_URL}/sequencia/${id}`, seqAlterada)
                .then(() => {
                    callback(fluxo)
                    dispatch(showFluxo())
                })
            }
        })
        .catch(e => {
            // console.log('e.response.data.errors -> ',e);
            e.response.data.errors.forEach(error => tsError(error))
        })
    }
}