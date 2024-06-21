import axios from 'axios'
import { tsError } from '../common/toastr/toastr';
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