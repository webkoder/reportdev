import { TIPOS } from 'src/constants.js'
import { dateformat } from 'src/reusable/funcoes'

/**
 * Criar uma lista ordenada por dia e por hora das sessoes
 */
export class SessionOrderService{

    constructor(){
        this.days = []
    }

    /**
     * Extrai todas as sessões pela lista de dias
     * @param {array} dias Lista de dias com o padrão do component Dev
     */
    extractSessionsByDays( dias ){
        // para cada dia
        for (const key in dias) {
            if ( dias[key] === undefined ) {
                continue;
            }
            const dia = dias[key];

            // extrair a sessão
            let sessoes = [];
            TIPOS.forEach( tipo => sessoes = sessoes.concat( dia.atividades[tipo].sessions ) );

            // Ordernar sessões
            sessoes.sort(function(a,b){
                return a.ini - b.ini;
            });

            // adicionar no atributo da classe
            this.days[ key ] = sessoes
        }

        this.fomatter();
    }

    fomatter(){
        this.days.forEach( dia => {
            dia.map( sessao => {
                sessao.horainicio = dateformat( sessao.ini )
                sessao.horafim = dateformat( sessao.end )
            })
        })
    }

}