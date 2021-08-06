/**
 * Classe legada do componente backlog.js
 * deve receber os dados da api do monday e transformar em uma lista
 * de dias com os itens comcluidos no dia
 */

import { TIPOS, MONDAYDEVNAME, DEVSCODE } from 'src/constants';
import { getMes, msgerro } from '../reusable/funcoes'


class BacklogItemsProcess{
    constructor( mes, ano){
        // this.today = this.getToday();
        this.mes = mes;
        this.ano = ano;
    }

    /*getToday(){
        var d = new Date();
        // if( d.getMonth() !== (window.mesatual - 1) ){
        //     d = new Date(window.anoatual, window.mesatual, 0);
        // }
        return d;
    }*/

    initDatas(){
        let datas = [];

        let lastDayOfMonth = new Date(this.ano, this.mes+1, 0);
        let lastday = lastDayOfMonth.getDate();

        let status = {}
        TIPOS.forEach( tipo => status[tipo] = 0)
        status.total = 0

        let devcodes = Object.getOwnPropertyNames( DEVSCODE )

        for (let dia = 1; dia <= lastday; dia++) {
            datas[dia] = {dia};
            devcodes.forEach( code => datas[dia][code] =  {...status} )
        }
        datas['total'] = {dia: "total"};
        devcodes.forEach( code => datas['total'][code] =  {...status} );

        return datas;
    }

    toObject(item){
        let o = {
            "prazo_de_entrega": new Date(item.column_values.filter( i => i.id==="prazo_de_entrega")[0].text),
            "person": item.column_values.filter( i => i.id==="person")[0].text,
            "status": item.column_values.filter( i => i.id==="status5")[0].text.toLowerCase(),
        }
        o.dev = MONDAYDEVNAME[o.person];
        return o;
    }

    processItems( groups ){
        const extenso = getMes(this.mes);

        let datas = this.initDatas();

        for (const group of groups) {
            if(  group.title === `Concluídos ${extenso}` || group.title === `${extenso} ${this.ano}` ){
                for (const item of group.items) {
                    let o = this.toObject(item);
                    let d = o.prazo_de_entrega.getDate();
                    if(datas[d][o.dev]===undefined){
                        msgerro( "Atividade concluída sem dev, favor, verificar no monday" );
                        continue;
                    }
                    datas[d][o.dev].total++;
                    datas[d][o.dev][o.status]++;

                    datas['total'][o.dev].total++;
                    datas['total'][o.dev][o.status]++;
                }
            }
        }

        return datas;
    }

}

export default BacklogItemsProcess;