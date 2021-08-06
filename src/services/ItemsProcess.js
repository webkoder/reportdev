export default class ItemsProcess{

    constructor( ){
        this.total = new BitemCount('total');
        this.meses = [];
    }

    process( data ){
        let meses = {};
        data.forEach( item =>{
            let b = new Bitem( item );
            let idx = `${ b.created.getFullYear() }-${ b.created.getMonth() }`;

            if( meses[idx] === undefined ){
                meses[idx] = new BitemCount( idx );
            }
            
            meses[idx].total++;
            this.total.total++;
            if( b.finished ){

                let idxf = `${ b.finished.getFullYear() }-${ b.finished.getMonth() }`;
                if( meses[idxf] === undefined ){
                    meses[idxf] = new BitemCount( idxf );
                }

                meses[idxf].concluidos++;
                this.total.concluidos++;
                if( b.finished.getFullYear() === b.created.getFullYear() && 
                    b.finished.getMonth() === b.created.getMonth() ){
                        meses[idx].no_mes++;
                    }
            }else{
                meses[idx].abertos++;
                this.total.abertos++;
            }

        });

        meses = Object.values( meses ).sort( compare );
        for (let i = 0; i < meses.length; i++) {
            const element = meses[i];
            let saldo = 0;
            if( i > 0){
                saldo = meses[ (i-1) ].saldo;
            }
            meses[i].saldo = (saldo - element.concluidos) + element.total;
        }
        this.meses = meses.reverse();
    }

    toDataSet(){
        const data = {
            labels: this.meses.map( mes => mes.mesanof).reverse().slice(10),
            datasets: [
                {
                    label: 'Saldo',
                    data: this.meses.map( mes => mes.saldo),
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, .8)',
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                    pointBorderColor: 'rgb(0, 0, 0)'
                },
                {
                    label: 'Concluídos',
                    data: this.meses.map( mes => mes.concluidos),
                    fill: false,
                    backgroundColor: 'rgb(0, 99, 20)',
                    borderColor: 'rgba(0, 99, 20, .8)',
                },
                {
                    label: 'Abertos',
                    data: this.meses.map( mes => mes.abertos),
                    fill: false,
                    backgroundColor: 'rgb(0, 5, 97)',
                    borderColor: 'rgba(0, 5, 97, .8)',
                }
            ],
          };

        return data;
    }

}

class Bitem{

    constructor( data ){
        this.dev = data.column_values[1].text;
        this.created = this.toDate(data.created_at);
        this.finished = this.toDate(data.column_values[0].text);
    }

    toDate( value ){
        return ( value.length > 0 ) ? new Date( value ) : null;
    }
}

class BitemCount{

    constructor( mesano ){
        this.mesano = mesano;
        this.mes = 0;
        this.ano = 0;
        this.abertos = 0;
        this.concluidos = 0;
        this.no_mes = 0;
        this.total = 0;
        this.saldo = 0;
        this.mesanof = this.getMesano();
    }

    getMesano(){
        let d = this.mesano.split('-');
        d[1] = parseInt( d[1] ) + 1;
        this.mes = d[1];
        this.ano = d[0];
        return `${d[1]} / ${d[0]}`;
    }
}

function compare( a, b ) {
    if ( a.ano < b.ano ){
      return -1;
    }
    if ( a.ano > b.ano ){
      return 1;
    }
    if ( a.mes < b.mes ){
      return -1;
    }
    if ( a.mes > b.mes ){
      return 1;
    }
    return 0;
  }