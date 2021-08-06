import { MONDAYGROUPS } from "src/constants";
import { MONDAYENDPOINT, MONDAYAUTHTOKEN } from "src/config";

/**
 * Consulta o monday e retorna a lista de grupos com os tempo de produtividade, status e dev dos itens
 * @returns array Lista de grupo do monday
 */
export async function getTimeControlData(){
    // groups(ids: [novo_grupo60424, novo_grupo1536, novo_grupo12, novo_grupo68599 ]){
    let qry = `{
        "query":
        "{
            boards (ids: 316368019){
                groups(ids: [ ${MONDAYGROUPS} ]){
                        id,
                        title,
                        items(limit: 2000, page: 1) {
                            id,
                            name,
                           column_values(ids:[controle_de_tempo9, status5, person ]) {
                                id,
                                value,
                                text
                            }
                        }
                    }
                }
            }"
        }`;


        qry = qry.replace(/(\r\n|\n|\r)/gm, ' ');

        let response = await fetch(MONDAYENDPOINT ,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': MONDAYAUTHTOKEN
            },
            body: qry
        });
        let resposta = await response.json();
        return resposta.data.boards[0].groups;

}
/**
 * 
 * @returns array Grupos com dados de criação, status, dev e prazo de entrega dos itens
 */
export async function getBacklogItemsData(){
    let qry = `{
        "query":
        "{
            boards (ids: 316368019){
                groups(ids: [${MONDAYGROUPS} ]){
                    id,
                    title,
                    items(limit: 1000, page: 1) {
                       column_values(ids:[creation_log, status, person, status5, prazo_de_entrega ]) {
                            id,
                            text
                        }
                    }
                }
            }
        }"
    }`;


    qry = qry.replace(/(\r\n|\n|\r)/gm, ' ');

    let response = await fetch(MONDAYENDPOINT ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': MONDAYAUTHTOKEN
        },
        body: qry
    });
    let resposta = await response.json();
    return resposta.data.boards[0].groups;
}

export async function getGroupsData(){
    let qry = `{
        "query":
        "{
            boards (ids: 316368019){
                groups{
                    id,
                    title
                }
            }
        }"
    }`;


    qry = qry.replace(/(\r\n|\n|\r)/gm, ' ');

    let response = await fetch(MONDAYENDPOINT ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': MONDAYAUTHTOKEN
        },
        body: qry
    });
    let resposta = await response.json();
    return resposta.data.boards[0].groups;
}

export async function getAllItems(){
    let qry = `{
        "query":
        "{
            boards( ids:316368019){
              items(){
                name, created_at, column_values( ids:[status, prazo_de_entrega, person]){
                  text, value
                }
              }
            }
          }"
    }`;


    qry = qry.replace(/(\r\n|\n|\r)/gm, ' ');

    let response = await fetch(MONDAYENDPOINT ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': MONDAYAUTHTOKEN
        },
        body: qry
    });
    let resposta = await response.json();
    return resposta.data.boards[0].items;
}