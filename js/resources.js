/* Resources.js
 * Este é simplesmente um utilitário de carregamento de imagens. Facilita o processo de carregamento
 * arquivos de imagem para que possam ser usados dentro do seu jogo. Inclui também
 * uma camada "caching" simples para reutilizar imagens em cache se você tentar
 * para carregar a mesma imagem várias vezes.
 */
(function() {
    var resourceCache = {};
    var readyCallbacks = [];

    /* Esta é a função de carregamento de imagem acessível publicamente. Aceita
     * uma matriz de strings apontando para arquivos de imagem ou uma string para um único
     * imagem Em seguida, ele chamará nossa função de carregamento de imagem particular de acordo.
     */
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            
163/5000
            /* Se o desenvolvedor passou em uma matriz de imagens
            * percorra cada valor e chame nossa imagem
            * loader nesse arquivo de imagem
            */
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            /* O desenvolvedor não passou um array para essa função,
             * assume que o valor é uma string e chama nosso carregador de imagens
             * diretamente.
             */
            _load(urlOrArr);
        }
    }

    /* Esta é a nossa função de carregador de imagem privada, é
     * chamado pela função public loader de imagens.
     */
    function _load(url) {
        if(resourceCache[url]) {
            /* Se esta URL foi previamente carregada, existirá dentro de
             * nossa matriz resourceCache. Basta retornar essa imagem em vez de
             * carregando novamente a imagem.
             */
            return resourceCache[url];
        } else {
            /* Este URL não foi carregado anteriormente e não está presente
             * dentro do nosso cache; precisaremos carregar essa imagem.
             */
            var img = new Image();
            img.onload = function() {
               
216/5000
                /* Uma vez que nossa imagem tenha sido carregada corretamente, adicione-a ao nosso cache
                * para que possamos simplesmente retornar essa imagem se o desenvolvedor
                * tenta carregar este arquivo no futuro.
                */
                resourceCache[url] = img;

                /* Quando a imagem é realmente carregada e armazenada corretamente em cache,
                 * chame todos os callbacks onReady () que definimos.
                 */
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* Defina o valor do cache inicial como falso, isso mudará quando
             * O manipulador de eventos onload da imagem é chamado. Finalmente, aponte
             * o atributo src da imagem para o URL transmitido.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* Isso é usado pelos desenvolvedores para pegar referências a imagens que eles conhecem
     * foram previamente carregados. Se uma imagem estiver em cache, isso funciona
     * o mesmo que chamar load () nesse URL.
     */
    function get(url) {
        return resourceCache[url];
    }

    /* Esta função determina se todas as imagens que foram solicitadas
     * para o carregamento foram de fato carregados corretamente.
     */
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* Esta função irá adicionar uma função à pilha de retorno que é chamada
     * quando todas as imagens solicitadas são carregadas corretamente.
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* Este objeto define as funções publicamente acessíveis disponíveis para
     * desenvolvedores criando um objeto global Resources.
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
