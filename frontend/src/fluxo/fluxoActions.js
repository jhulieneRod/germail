import axios from 'axios'
import { tsError, tsSuccess } from '../common/toastr/toastr';
import consts from '../consts';
const BASE_URL = consts.API_URL;

export function getDadosFluxo(fluxo, callback) {
    axios.get(`${BASE_URL}/fluxoSequencia/${fluxo}`)
    .then((resp) => {
        if(resp.data){
            callback(resp.data);
        }else{
            tsError('Erro ao buscar as informações do fluxo.');
        }
    })
}

export function getContentNode(etapa, callback) {
    axios.get(`${BASE_URL}/fluxoEtapa/${etapa}`)
    .then((resp) => {
        callback(resp.data);
    })
}

export function updateFluxo(fluxo) {
    axios.put(`${BASE_URL}/fluxoSequencia/${fluxo.id}`, fluxo)
    .then((resp) => {
        if(resp.data){
            tsSuccess('Fluxo Salvo!');
        }else{
            tsError('Erro ao salvar o fluxo.');
        }
    })
}

export function updateNode(node, isUpdate) {
    const method = (isUpdate) ? 'put' : 'post';
    axios[method](`${BASE_URL}/fluxoEtapa/${node.id}`, node)
    .then((resp) => {
        if(!resp.data){
            tsError('Erro ao salvar a etapa.');
        }
    })
}