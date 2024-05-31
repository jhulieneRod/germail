import axios from 'axios'
import consts from '../consts';
const BASE_URL = consts.API_URL;

export function getList(tipo = 0, callback = () => {}) {
    axios.get(`${BASE_URL}/log_destinatario_email/${tipo}`)
    .then((dados) => {
        callback(dados.data);
    }).catch((error) => {
        console.log(error);
        return [];
    });    
}