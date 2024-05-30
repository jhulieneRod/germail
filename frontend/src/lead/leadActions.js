import axios from 'axios'
import { tsSuccess, tsError } from '../common/toastr/toastr';
// import { reset as resetForm, initialize } from 'redux-form'
import { initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions'
import consts from '../consts';
const BASE_URL = consts.API_URL;
const cad_key = 'CAD_LEAD';

const INITIAL_VALUES = () => ({});

export function getList() {
    const request = axios.get(`${BASE_URL}/lead`)

    return {
        type: 'LEAD_FETCHED',
        payload: request
    }
}

export function create(values, dispatch, props) {
    return submit(values, 'post', 'Lead Incluído com Sucesso!');
}

export function update(values, dispatch, props) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete', 'Lead Deletado com Sucesso!');
}

function submit(values, method, msg = 'Lead Alterado com sucesso!') {
    return dispatch => {
        const id = values.id ? values.id : ''
        axios[method](`${BASE_URL}/lead/${id}`, values)
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

export function showUpdate(lead) {
    return [
        showTabs(['tabUpdateLead'], cad_key),
        selectTab('tabUpdateLead', cad_key),
        initialize('leadForm', lead) 
    ]
}

export function init(isPost = false) {

    return [
        showTabs(['tabListLead', 'tabCreateLead'], cad_key),
        selectTab((isPost) ? 'tabCreateLead' : 'tabListLead', cad_key),
        getList(),
        initialize('leadForm', INITIAL_VALUES())
    ]
}