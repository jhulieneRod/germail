import axios from 'axios'
import { tsSuccess, tsError } from '../common/toastr/toastr';
// import { reset as resetForm, initialize } from 'redux-form'
import { initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions'
import consts from '../consts';
const BASE_URL = consts.API_URL;
const cad_key = 'CAD_TAG';

const INITIAL_VALUES = () => ({});

export function getList() {
    const request = axios.get(`${BASE_URL}/tag`)

    return {
        type: 'TAG_FETCHED',
        payload: request
    }
}

export function create(values, dispatch, props) {
    return submit(values, 'post', 'Tag Incluída com Sucesso!');
}

export function update(values, dispatch, props) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete', 'Tag Deletada com Sucesso!');
}

function submit(values, method, msg = 'Tag Alterada com sucesso!') {
    return dispatch => {
        const id = values.id ? values.id : ''
        axios[method](`${BASE_URL}/tag/${id}`, values)
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

export function showUpdate(tag) {
    return [
        showTabs(['tabUpdateTag'], cad_key),
        selectTab('tabUpdateTag', cad_key),
        initialize('tagForm', tag) 
    ]
}

export function init(isPost = false) {

    return [
        showTabs(['tabListTag', 'tabCreateTag'], cad_key),
        selectTab((isPost) ? 'tabCreateTag' : 'tabListTag', cad_key),
        getList(),
        initialize('tagForm', INITIAL_VALUES())
    ]
}