import { getDiaSemana, hms } from '../reusable/funcoes';
import ProdutividadeProcess from '../services/ProdutividadeProcess';
import BacklogItemsProcess from '../services/BacklogItemsProcess';
import ResumoProdutividade from './ResumoProdutividade';
import { TIPOS, DEVSCODE, METATEMPO,
    KPITEMPO, FERIADOS } from '../constants';
import MonthDays from 'src/reusable/MonthDays';


export default class DevMeta{
    constructor(mes = ''){
        this.tech = new ResumoProdutividade('Tech');        
        this.dias = [];
        if( mes === '' ){
            return;
        }
        var d = new Date();
        let dc = new Date(mes.ano, mes.mes, 1);
        this.isCurrentMonth = ( d.getMonth() === dc.getMonth() && d.getFullYear() === dc.getFullYear() );
        this.mes = mes.mes;
        this.ano = mes.ano;

        // array auxiliar com codigos dos devs
        this.devscode = Object.getOwnPropertyNames(DEVSCODE);

        this.devs = this.initDevs();

        this.produtividadeDefault();
        this.itemsDefault();
        this.tempoDefault();
    }

    getStatus(dia, mes, diasemana){
        let text = '';
        let time = 28800; // 8 horas

        if( diasemana === 0 || diasemana === 6 )
            return {text: ' / FDS', time: 0};

        for (const i of FERIADOS) {
            if( i.mes === mes && i.dia === dia ){
                return {text: ' / ' + i.texto, time: i.tempo};
            }
        }
        
        return {text, time};
    }

    diaSemana(dia){
        let d = new Date(this.ano, this.mes, 1);
        d.setDate( dia );
        let s = this.getStatus( dia, d.getMonth()+1, d.getDay() );
        return { text: getDiaSemana( d.getDay() ) + s.text, time: s.time };
    }

    /**
     * Inicializa dados do Dev, com o resumo de produtividade e o calendário dos dias do mês recebido
     * @returns array
     */
    initDevs(){
        let dev = {};

        // Para cada dev, inicializar
        for (const code of this.devscode) {
            let _name = DEVSCODE[code];
            dev[ code ] = {
                name: _name,
                resumo: new ResumoProdutividade( _name ),
                lista: new MonthDays( this.mes, this.ano, code ),
                atuais: []
            }
        }
        return dev;
    }

    /**
     * Calcular os valores padrão de Produtividade
     */
    produtividadeDefault(){
        let _acumulado = 0;
        let _final = 0;
        let _teto = 0;

        // Para cada Dev ...
        this.devscode.forEach( item => {
            // ... Setar o default do resumo
            this.devs[ item ].resumo.setProdutividadeDefault(
                this.devs[item].lista.final,
                this.devs[item].lista.acumulado,
                this.devs[item].lista.teto
            )
            // ... somar o teto
            _teto += this.devs[item].lista.teto;
            _final += this.devs[item].lista.final;
            _acumulado += this.devs[item].lista.acumulado;
        });

        // setar os valores somados para o resumo de Tech
        this.tech.setProdutividadeDefault(
            _final,
            _acumulado,
            _teto
        );
        
    }


    /**
     * Definir os valores padrão para metas de Itens
     */
    itemsDefault(){
        let _meta = 0;
        let _kpi = 0;

        // Para cada dev
        for (const code in DEVSCODE){
            let _devmeta = this.devs[ code ].lista.items;
            let _devkpi = this.devs[ code ].lista.itemskpi;
            // Setar os itens no resumo
            this.devs[ code ].resumo.setItemsDefault(_devmeta, _devkpi);
            // Somar os itens
            _meta += _devmeta;
            _kpi += _devkpi;

        }

        // Setar os itens somados no resumo de Tech
        this.tech.setItemsDefault(
            _meta,
            _kpi
        );
    }

    /**
     * Padrão para calcular a média de tempo de itens concluídos
     */
    tempoDefault(){
        this.tech.setTempoDefault(METATEMPO, KPITEMPO);

        for (const code in DEVSCODE)
            this.devs[ code ].resumo.setTempoDefault(METATEMPO, KPITEMPO);
        
    }

    /**
     * Formatar os valores do resumo
     */
    formatter(){
        this.tech.formatter();
        for (const code in DEVSCODE) {
            this.devs[ code ].resumo.formatter();
        }
    }

    /**
     * Processar os valores do resumo
     */
    calc(){
        this.tech.process();
        for (const code in DEVSCODE) 
            this.devs[ code ].resumo.process();
    }
    
    /**
     * Lê os dados de produtividade e soma para cada dev e no resumo geral
     * @param {array} data lista de grupo com itens de produtividade
     */
    setTimeControlData( data ){
        let sessoes = new ProdutividadeProcess(this.mes, this.ano)
        // processa e retorna array com as sessões calculadas e atividades atuais
        sessoes = sessoes.processItems( data )
        let atuais = sessoes.atuais
        sessoes = sessoes.sessoes
        
        for (const s of sessoes) {

            // campos seletores
            let _ano = s.ini.getFullYear();
            let _mes = s.ini.getMonth();
            let _dia = s.ini.getDate();
            let _dev = s.dev;
            let _atividade = s.status.toLowerCase();

            if( _mes === this.mes && _ano === this.ano ){
                // Adiciona a sessão para o dia/dev/tipo de atividade
                if( _atividade.length === 0 ){
                    /* TODO trocar pela notificação padrão */
                    alert( 'atividade sem categoria' );
                    continue;
                }

                // Soma por dev e de total
                this.devs[ _dev ].resumo.addProdutividade(_atividade, s.duracao);
                this.tech.addProdutividade(_atividade, s.duracao);

                // meta.dev (novo)
                this.devs[ _dev ]
                    .lista.dias[ _dia ]
                    .atividades[ _atividade ]
                    .sessions
                    .push( s );

                this.devs[ _dev ]
                    .lista.dias[ _dia ]
                    .total
                    .executado += s.duracao;

                this.devs[ _dev ]
                    .lista.dias[ _dia ]
                    .total
                    .acumulado += s.duracao;
                
            }
        }


        this.devscode.map( item => this.devs[item].lista.formatter() );

        for (const _dev of this.devscode) {
            this.devs[ _dev ].resumo.produtividade.executado.formatted = hms(this.devs[ _dev ].resumo.produtividade.executado.value);
            this.devs[ _dev ].resumo.produtividade.acumulado.formatted = hms(this.devs[ _dev ].resumo.produtividade.acumulado.value);
        }
        this.tech.produtividade.executado.formatted = hms(this.tech.produtividade.executado.value);
        this.tech.produtividade.acumulado.formatted = hms(this.tech.produtividade.acumulado.value);

        atuais.map( sessao => this.devs[ sessao.dev ].atuais.push( sessao ) )
    }

    setBacklogItemsData( data ){
        let sessoes = new BacklogItemsProcess( this.mes, this.ano );
        sessoes = sessoes.processItems( data );

        for (const sessao of sessoes) {
            if( sessao === undefined ) continue;
            for (const code of this.devscode) {
                for (const tipo of TIPOS) {
                    if( sessao[code][ tipo ] === 0 ) continue;

                    this.devs[ code ].resumo.addItems(tipo, sessao[code][ tipo ]);
                    this.tech.addItems(tipo, sessao[code][tipo]);

                    // devs.dia (novo)
                    // Contador de itens concluidos
                    this.devs[code].lista.dias[sessao.dia].atividades[tipo].items = sessao[code][ tipo ];
                    // Soma dos itens concluídos
                    this.devs[code].lista.dias[sessao.dia].total.items += sessao[code][ tipo ];
                }
            }
        }
    }
}