import { percent, mf, hms } from '../reusable/funcoes';
import { TIPOS } from '../constants';


export default class ResumoProdutividade{
    constructor(name = ''){
        this.name = name;
        this.produtividade = {
            acumulado: { value: 0, percent: 0, formatted: '00:00:00' },
            executado: { value: 0, percent: 0, formatted: '00:00:00' },
            final: { value: 0, percent: 80, formatted: '00:00:00' },
            saldo: { value: 0, percent: 0, classname: 'undefined', formatted: '00:00:00' },
            teto: { value: 0, percent: 100, formatted: '00:00:00' },
        };
        this.tempo = {
            executado: { value: 0, formatted: '00:00:00' },
            saldo: { value: 0, classname: 'undefined', formatted: '00:00:00' },
            final: { value: 0, formatted: '00:00:00' },
            kpi: { value: 0, formatted: '00:00:00' },
        };
        this.items = {
            executado: { value: 0, percent: 0, formatted: '0' },
            saldo: { value: 0, percent: 0, classname: 'undefined', formatted: '0' },
            final: { value: 0, percent: 80, formatted: '0' },
            kpi: { value: 0, percent: 100, formatted: '0' },
        };

        let _model = {items: 0, produtividade: 0, formatted: '00:00:00'};
        this.atividades = {};
        TIPOS.forEach( item => this.atividades[item] = {..._model} );

    }

    addItems( tipo, value ){
        this.items.executado.value += value
        this.atividades[tipo].items += value
    }

    addProdutividade( tipo, value ){
        this.produtividade.executado.value += value;
        this.atividades[tipo].produtividade += value
    }

    process(){
        this.setTempo();
        this.setPercent();
        this.setSaldo();
    }

    setPercent(){
        this.produtividade.executado.percent =
            percent(
                this.produtividade.executado.value,
                this.produtividade.teto.value
            );

        this.produtividade.acumulado.percent =
            percent(
                this.produtividade.acumulado.value,
                this.produtividade.teto.value
            );

        this.items.executado.percent =
            percent(
                this.items.executado.value,
                this.items.final.value
            );

        this.items.saldo.percent =
            mf(100 - this.items.executado.percent);

        }

    setSaldo(){
        // Produtividade
        this.produtividade.saldo.value = 
            this.produtividade.executado.value - 
            this.produtividade.acumulado.value;
                
        let _simbol = '+ ';
        this.produtividade.saldo.classname = 'previsto';

        if( this.produtividade.saldo.value < 0 ){
            this.produtividade.saldo.classname = 'imprevisto';
            this.produtividade.saldo.value *= -1;
            _simbol = '- ';
        }
        
        this.produtividade.saldo.percent = 
            mf(this.produtividade.acumulado.percent -
                this.produtividade.executado.percent);

        if( this.produtividade.saldo.percent < 0 ){
            this.produtividade.saldo.percent *= -1;
        }
        this.produtividade.saldo.percent = _simbol + 
            this.produtividade.saldo.percent;


        this.produtividade.saldo.formatted = _simbol + hms( this.produtividade.saldo.value );

        // Tempo
        this.tempo.saldo.value = this.tempo.final.value -
            this.tempo.executado.value;

        _simbol = '+ ';
        this.tempo.saldo.classname = 'previsto';
    
        if( this.tempo.saldo.value < 0 ){
            this.tempo.saldo.classname = 'imprevisto';
            this.tempo.saldo.value *= -1;
            _simbol = '- ';
        }

        this.tempo.saldo.formatted = _simbol + hms( this.tempo.saldo.value );

        // Items
        this.items.saldo.value = this.items.executado.value -
            this.items.final.value;

        _simbol = '+ ';
        this.items.saldo.classname = 'previsto';
    
        if( this.items.saldo.value < 0 ){
            this.items.saldo.classname = 'imprevisto';
            this.items.saldo.value *= -1;
            _simbol = '- ';
        }

        this.items.saldo.formatted = _simbol + this.items.saldo.value;
    }

    setTempo(){
        this.tempo.executado.value = 
        this.produtividade.executado.value /
            this.items.executado.value;

        this.tempo.executado.formatted = hms(this.tempo.executado.value);
    }

    formatter(){
        this.produtividade.final.formatted = hms(this.produtividade.final.value);
        this.produtividade.teto.formatted = hms(this.produtividade.teto.value);
        this.produtividade.acumulado.formatted = hms(this.produtividade.acumulado.value);

        for (const _tipo of TIPOS) {
            this.atividades[_tipo].formatted = hms(this.atividades[_tipo].produtividade);
        }
        
        this.tempo.final.formatted = hms(this.tempo.final.value);
        this.tempo.kpi.formatted = hms(this.tempo.kpi.value);
        this.produtividade.executado.formatted = hms(this.produtividade.executado.value);
    }

    setProdutividadeDefault( final, acumulado, teto){
        this.produtividade.final.value = final;
        this.produtividade.acumulado.value = acumulado;
        this.produtividade.teto.value = teto;
    }

    setItemsDefault(final, kpi){
        this.items.final.value = final;
        this.items.kpi.value = kpi;
    }

    setTempoDefault( final, kpi){
        this.tempo.final.value = final;
        this.tempo.kpi.value = kpi;
    }
}