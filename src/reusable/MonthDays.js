import { getDiaSemana, hms, mf } from '../reusable/funcoes';
import { FERIADOS, TIPOS, METAPRODUTIVIDADE, METAITEMS,
    KPIITEMS, METATEMPO } from '../constants';
import Classificacao from '../models/Classificacao';

/**
 * Classe responsável por criar a lista de dias do Dev de acordo com a tabela de férias/feriados
 */
export default class MonthDays{

    constructor( mes = '', ano = '', dev = 0){
        if( mes === '' || ano === '' || dev === 0 ){
            return;
        }

        this.mes = mes;
        this.ano = ano;
        this.dev = dev;
        this.dias = [];

        // Mes, ultimo dia
        let dc = new Date(ano, mes, 1);
        let lastDayOfMonth = new Date(dc.getFullYear(), dc.getMonth() + 1, 0);
        let lastday = lastDayOfMonth.getDate();

        // Mes atual
        var d = new Date();
        this.isCurrentMonth = ( d.getMonth() === dc.getMonth() && d.getFullYear() === dc.getFullYear() );

        // Inicializar os dias
        for(let i = 1; i <= lastday; i++){
            let _statusdia = this.diaSemana( i );
            this.dias[i] = {
                dia: i,
                diasemana: _statusdia.text,
                tempo: _statusdia.time,
                atividades: this.initClassificacao(),
                total: {
                    tempo: 0,
                    executado: 0,
                    diff: 0,
                    diffclass: 'undefined',
                    media: 0,
                    items: 0,
                    percent: 0
                }
            };
        }

        // inicializar valores
        this.final = 0;
        this.acumulado = 0;
        this.teto = 0;
        this.items = 0;
        this.itemskpi = 0;

        // Executar calculor de valores
        this.produtividadeDefault();
        this.itemsDefault();

    }

    /**
     * Formatar valores de produtividade
     */
    formatter(){

        this.dias.forEach( dia => {
            dia.total.saldo = 
                dia.total.executado - 
                (dia.tempo * METAPRODUTIVIDADE);
    
            dia.total.diffclass = 'success';
            let _symbol = '+ ';
            if( dia.total.saldo < 0 ){
                dia.total.diffclass = 'danger';
                dia.total.saldo *= -1;
                _symbol = '- ';
            }
            
            dia.total.percent = mf((dia.total.executado / METATEMPO) * 100);
            dia.total.tempo = hms(dia.total.executado);
            dia.total.diff = _symbol + hms(dia.total.saldo);
        })
    }

    /**
    * Calculo de itens de meta do mês
    */
    itemsDefault(){
        let _dias = this.dias
            .map( item => (item.tempo > 0) ? 1 : 0 )
            .reduce((acc, item) => acc + item);

        this.items = Math.round(_dias * METAITEMS);
        this.itemskpi = Math.round(_dias * KPIITEMS);
    }
    /**
     * Calcula os valores padrão do mês de produtividade
     */
    produtividadeDefault(){
        let _acumulado = 0;
        let _final = 0;
        let _teto = 0;

        // para cada dia somar os valores de total
        this.dias.map( dia => _teto += parseInt(dia.tempo) );
        this.final = _teto * METAPRODUTIVIDADE;

        // soma de tempo acumulado no mês (até o dia atual) ou se não for o mês corrente, o acumulado é o teto
            let _d = new Date();
            this.dias.forEach( dia => {
                if( _d.getDate() >= dia.dia ){
                    _acumulado += (parseInt( dia.tempo ) * METAPRODUTIVIDADE);
                }
                _final += (parseInt( dia.tempo ) * METAPRODUTIVIDADE);
            });
        if( !this.isCurrentMonth ){

            _acumulado = _final;
        }

        this.teto = _teto;
        this.acumulado = _acumulado;
    }

    /**
     * Retorna o status do dia da semana de acordo com a dia ddo mês
     * @param {int} dia Dia do mês
     * @returns Object com nome do dia da semana e o tempo total no dia
     */
    diaSemana(dia){
        let d = new Date(this.ano, this.mes, 1);
        d.setDate( dia );
        let s = this.getStatus( dia, d.getMonth()+1, d.getDay() );
        return { text: getDiaSemana( d.getDay() ) + s.text, time: s.time };
    }

    /**
     * Obtem o status do dia de trabalho (ou descanso) com o tempo disponível
     * @param {int} dia Dia do mês
     * @param {int} mes Mês do ano
     * @param {int} diasemana Representação JS do dia da semana
     * @returns Object com o texto referente ao dia e o total de tempo no dia
     */
    getStatus(dia, mes, diasemana){
        let text = '';
        let time = 28800; // 8 horas

        if( diasemana === 0 || diasemana === 6 )
            return {text: ' / FDS', time: 0};

        for (const i of FERIADOS) {
            if( i.mes === mes && i.dia === dia && (i.dev === this.dev || i.dev === "Todos") ){
                return {text: ' / ' + i.texto, time: i.tempo};
            }
        }
        
        return {text, time};
    }

    /**
     * Cria uma objeto vazio com as categorias de atividades padrão
     * @returns Array de objetos Classificação
     */
    initClassificacao(){
        let d = {};
        for (const tipo of TIPOS) {
            d[ tipo ] =  new Classificacao( tipo );
        }
        return d;
    }
}
