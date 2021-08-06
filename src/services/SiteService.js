import { ADMENDPOINT } from "src/config";
import axios from 'axios';

const setitembacklog = axios.create({
    baseURL: ADMENDPOINT + 'backlogsite/addsite',
    crossdomain: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
    }
});

// export const setitembacklog = axios.create({
//     baseURL:  'backlogsite/addsite'
// });

export async function getSiteData(){
        // TODO autenticação via token head
        let response = await fetch(ADMENDPOINT + 'backlogsite/listabase');
        let resposta = await response.json();
        return resposta;
}

export async function addSiteData(data){
    let resposta = await setitembacklog.post('', data );
    return resposta;
}

export async function getBacklogSiteData(mes,ano){
    let mesano = `${ano}-${mes}`;
    let resposta = await setitembacklog.get(ADMENDPOINT + 'backlogsite/listaitems/' + mesano );
    return resposta.data;
}

export async function getSiteInfoData(mes,ano){
    let mesano = `${ano}-${mes}`;
    let resposta = await setitembacklog.get(ADMENDPOINT + 'backlogsite/lista/' + mesano );
    return resposta.data;
}

