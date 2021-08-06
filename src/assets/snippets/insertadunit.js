
/*
Adiciona o gpt.js e adiciona um bloco de anúncio no local indicado pela váriável
element e faz a chamada do anúncio em 3 segundos
*/
var s = document.createElement('script');
s.src='https://securepubads.g.doubleclick.net/tag/js/gpt.js';
s.async = true;
document.head.appendChild(s);

setTimeout( function(){
    var element = 'nbtpreparagraph';
    document.getElementById(element).style.height = '250px';
    document.getElementById(element).style.background = 'coral';
    console.log( document.getElementById(element) );
    window.googletag = window.googletag || {cmd: []};
    googletag.cmd.push(function() {
        googletag.defineSlot('/150684666/nbtformat.alert',
            [[468, 100], [320, 100], [300, 100], [300, 250],
            'fluid', [250, 250], [320, 50], [468, 60]],
            element).addService(googletag.pubads());
        
            googletag.pubads().addEventListener('impressionViewable', function(event){
                console.log('impressionViewable');
                console.log(event);
            });
            googletag.pubads().addEventListener('slotRenderEnded', function(event){
                console.log('slotRenderEnded');
                console.log(event);
            });
            googletag.pubads().addEventListener('slotOnload', function(event){
                console.log('slotOnload');
                console.log(event);
            });
            googletag.pubads().addEventListener('slotRequested', function(event){
                console.log('slotRequested');
                console.log(event);
            });
            googletag.pubads().addEventListener('slotResponseReceived', function(event){
                console.log('slotResponseReceived');
                console.log(event);
            });
            googletag.pubads().addEventListener('slotVisibilityChanged', function(event){
                console.log('slotVisibilityChanged');
                console.log(event);
            });

            
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
        googletag.display(element);
    });
}, 3000);