import axios from 'axios'
import { tsSuccess, tsError } from '../common/toastr/toastr';
import { initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions'
import consts from '../consts';
const BASE_URL = consts.API_URL;
const cad_key = 'CAD_CONFIGURACAO';

const INITIAL_VALUES = () => ({});

export function getList() {
    const request = axios.get(`${BASE_URL}/configuracao/`);
    
    return {
        type: 'CONFIGURACAO_FETCHED',
        payload: request
    }
}

export function getHtml(callback = () => {}) {
    axios.get(`${consts.OAPI_URL}/homepage/`)
    .then((resp) => {
        debugger;
        callback(resp.data);
    })
}

export function create(values, dispatch, props) {
    return submit(values, 'post', 'Configuração Incluída com Sucesso!');
}

export function update(values, dispatch, props) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete', 'Configuração Deletada com Sucesso!');
}

function submit(values, method, msg = 'Configuração Alterada com sucesso!') {
    return dispatch => {
        const id = values.id ? values.id : ''
        axios[method](`${BASE_URL}/configuracao/${id}`, values)
            .then(resp => {
                if(method != 'delete'){
                    atualizaIndex();
                }
                tsSuccess(msg);
                dispatch(init())
            })
            .catch(e => {
                // console.log('e.response.data.errors -> ',e);
                e.response.data.errors.forEach(error => tsError(error))
            })
    }
}

function atualizaIndex(){
    axios.get(`${BASE_URL}/homepage/`).then((dados) =>{
        
    })
}

export function showUpdate(Configuracao) {
    return [
        showTabs(['tabUpdateConfiguracao'], cad_key),
        selectTab('tabUpdateConfiguracao', cad_key),
        initialize('configuracaoForm', Configuracao) 
    ]
}

export function init(isPost = false) {

    return [
        showTabs(['tabListConfiguracao', 'tabCreateConfiguracao'], cad_key),
        selectTab((isPost) ? 'tabCreateConfiguracao' : 'tabListConfiguracao', cad_key),
        getList(),
        initialize('configuracaoForm', INITIAL_VALUES())
    ]
}