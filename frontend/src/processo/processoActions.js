import axios from 'axios'
import { tsSuccess, tsError } from '../common/toastr/toastr';
// import { reset as resetForm, initialize } from 'redux-form'
import { initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions'
import consts from '../consts';
const BASE_URL = consts.API_URL;
const cad_key = 'CAD_PROCESSO';

const INITIAL_VALUES = () => ({
    id: '', 
    descricao: '', 
    prazo: ''
});

export function getList() {
    // const request = axios.get(`${BASE_URL}/processo`)

    return {
        type: 'PROCESSO_FETCHED',
        payload: {data: [{id: 1, descricao: 'Processo Teste', prazo: '10/08/2024'}]}
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

function submit(values, method) {

    return dispatch => {
        const id = values.id ? values.id : ''
        axios[method](`${BASE_URL}/processo/${id}`, values)
            .then(resp => {
                tsSuccess('Operação realizada com sucesso.')
                dispatch(init(method === 'post'))
            })
            .catch(e => {
                // console.log('e.response.data.errors -> ',e);
                e.response.data.errors.forEach(error => tsError(error))
            })
    }
}

export function showUpdate(processo) {
    return [
        showTabs(['tabUpdateProcesso'], cad_key),
        selectTab('tabUpdateProcesso', cad_key),
        initialize('processoForm', processo)
    ]
}

export function showGerenciamento() {
    return [
        showTabs(['tabGerenciamentoProcesso'], cad_key),
        selectTab('tabGerenciamentoProcesso', cad_key)
    ]
}

export function init(isPost = false) {

    return [
        showTabs(['tabListProcesso', 'tabCreateProcesso'], cad_key),
        selectTab((isPost) ? 'tabCreateProcesso' : 'tabListProcesso', cad_key),
        getList(),
        initialize('processoForm', INITIAL_VALUES())
    ]
}