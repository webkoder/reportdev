const formatterbr = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});
const formatterus = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'USD'});
const formatterint = new Intl.NumberFormat('pt-BR', {style: 'decimal'});


export function br (val = 0){
    if( !val ) return formatterbr.format(0)
    return formatterbr.format(val)
}


export function us (val = 0){
    if( !val ) return formatterus.format(0)
    return formatterus.format(val)
}


export function int (val = 0){
    if( !val ) return formatterint.format(0)
    return formatterint.format(val.toFixed(0))
}

export function date (val){
    var str = val.split('-');
    var date = new Date(
        parseInt(str[0]),
        parseInt(str[1]) - 1,
        parseInt(str[2])
    );

    return date.toLocaleDateString('pt-BR');
}

export function getMes( mes ){
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 
        'Abril', 'Maio', 'Junho', 'Julho', 
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 
        'Dezembro', 
    ];

    return meses[mes];
}

export function getDiaSemana( d ){
    let dias = [
        'Dom',
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sab'
    ];

    return dias[d];
}

/**
 * Moeda Formatada
 * @param {number} val Valor a ser formatado com duas casas decimais
 */
export function mf(val){
    return Math.round(val * 100) / 100
}

export function msgerro( txt ){
    /* TODO trocar pelo dialog padrão do core ui */
    alert( txt );
}

export function percent(v1, v2){
    return Math.round( (v1 / v2)*10000 ) / 100;
}

/**
 * Transforma o valor em segundos no formato, Horas, minuto, segundos
 * @param {int} intvalue Valor da duração em segundos
 * @returns duração convertido em Horas:minutos:segundos
 */
export function hms (intvalue) {
    var sec_num = parseInt(intvalue, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

export function dateformat( data ){
    let hour = ( data.getHours() < 10 ) ? '0' + data.getHours() : data.getHours()
    let minute = ( data.getMinutes() < 10 ) ? '0' + data.getMinutes() : data.getMinutes()
    let seconds = ( data.getSeconds() < 10 ) ? '0' + data.getSeconds() : data.getSeconds()

    // return `${hour}:${minute}:${seconds}`;
    return `${hour}:${minute}`;
}

export function newKey(){
    return Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 6)
}