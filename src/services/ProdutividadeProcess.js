/**
 * Classe legada do componente timecontrol.js
 * deve receber os dados da api do monday e transformar em uma lista
 * de dias com a produtividade dos devs separado por tipo de atividade
 */

 import { FERIADOS } from 'src/constants';
import { hms } from '../reusable/funcoes';

export default class ProdutividadeProcess{
    constructor(mes, ano){
        this.mes = mes;
        this.ano = ano;
    }


    calculaBase(dia, dev){
        const diasemana = ['dom','seg','ter','qua','qui','sex','sab'];

        let _d = new Date(this.ano, this.mes , dia);
        let _tempo = 8 * 3600;
        let _texto = '';
        let dsem = diasemana[_d.getDay()];


        if( _d.getDay() === 0 || _d.getDay() === 6 ){
            _tempo = 0;
            _texto = "FDS";
        }

        // TODO descobrir porque tem duas referencias a FERIADOS
        for (const e of FERIADOS) {
            if( e.dia === _d.getDate() && e.mes === (_d.getMonth() + 1) && ( e.dev === "Todos" || e.dev === dev ) ){
                _tempo = e.tempo;
                _texto = e.texto;
            }
        }

        return {
            dia: dsem,
            tempo: _tempo,
            texto: _texto,
            base: _tempo * 0.6,
            kpi: _tempo * 0.8
        };
    }

    toObject(item){
        let o = {
            "tempo": JSON.parse(item.column_values.filter( i => i.id==="controle_de_tempo9")[0].value),
            "person": JSON.parse(item.column_values.filter( i => i.id==="person")[0].value),
            "status": item.column_values.filter( i => i.id==="status5")[0].text,
        };
        let sessoes = [];
        if(o.tempo !== null){
            if( o.tempo.additional_value !== undefined ){
                // TODO Encontrar a atividade corrente
                // if( o.tempo.running ){
                //     console.log( o );
                // }
                for (const e of o.tempo.additional_value) {
                    if(e !== null ){
                        let ini = new Date(e.started_at);
                        if( ini.getMonth() !== this.mes ) continue;
                        let t ={
                            itemid: item.id,
                            item: item.name,
                            ini,
                            end: new Date(e.ended_at),
                            dev: e.started_user_id,
                            status: o.status,
                            duracao: 0,
                            duracaotempo: ""
                        };
                        t.duracao = (t.end.getTime() - t.ini.getTime()) / 1000;
                        if( t.duracao < 0 ) continue;
                        t.duracaotempo = hms(t.duracao);
                        t.dia = ini.getDate();
                        t.base = this.calculaBase( ini.getDate(), t.dev );
                        sessoes.push(t);
                    }
                }
            }
        }

        return sessoes;
    }

    processItems(groups){
        
        let sessoes = [];

        for (const group of groups) {
            for (const item of group.items) {
                sessoes = sessoes.concat( this.toObject(item) );
            }
        }

        return sessoes ;
    }

}