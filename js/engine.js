/* Engine.js
  * Este arquivo fornece a funcionalidade de loop do jogo (entidades de atualização e render),
  * desenha o tabuleiro inicial do jogo na tela e, em seguida, chama a atualização e
  * Renderize métodos no seu player e objetos inimigos (definidos em seu app.js).
  *
  * Um mecanismo de jogo funciona desenhando a tela inteira do jogo várias vezes,
  * Como um flipbook que você pode ter criado quando criança. Quando seu jogador se move
  * a tela, pode parecer que apenas a imagem / personagem está se movendo ou sendo
  * desenhado, mas esse não é o caso. O que realmente está acontecendo é toda a "cena"
  * está sendo desenhado repetidamente, apresentando a ilusão de animação.
  *
  * Este mecanismo torna o objeto de contexto (ctx) disponível globalmente para fazer
  * Escrevendo app.js um pouco mais simples para trabalhar.
  */
var Engine = (function(global) {
    /* Predefina as variáveis que usaremos neste escopo,
     * crie o elemento canvas, pegue o contexto 2D para aquela tela
     * defina a altura / largura do elemento da tela e adicione-o ao DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /*  Esta função serve como ponto de partida para o próprio loop do jogo
     * e manipula corretamente os métodos de atualização e renderização.
     */
    function main() {
       
        /* Receba as informações sobre o tempo delta que são necessárias se o seu jogo
        * requer animação suave. Porque todos os processos de computador
        * instruções em diferentes velocidades, precisamos de um valor constante que
        * seria o mesmo para todos (independentemente da rapidez com que
        * computador é) - hora do viva!
        */
            var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        

        /* Chame nossas funções de atualização / renderização, passe o tempo delta para
         * nossa função de atualização, pois pode ser usada para animações suaves.
         */
        update(dt);
        render();

        /* Defina nossa variável lastTime que é usada para determinar o tempo delta
         * para a próxima vez que esta função for chamada.
         */
        lastTime = now;

        /* Use a função requestAnimationFrame do navegador para chamar isso
         * funcionar novamente assim que o navegador conseguir desenhar outro quadro.
         */
        win.requestAnimationFrame(main);
    }

    /* Esta função faz algumas configurações iniciais que só devem ocorrer uma vez,
     * particularmente definindo a variável lastTime que é necessária para o
     * loop de jogo.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* Esta função é chamada por main (nosso loop de jogo) e ele mesmo chama todos
     * das funções que podem precisar atualizar os dados da entidade. Baseado em como
     * você implementa sua detecção de colisão (quando duas entidades ocupam o
     * mesmo espaço, por exemplo, quando seu personagem deveria morrer), você pode encontrar
     * a necessidade de adicionar uma chamada de função adicional aqui. Por enquanto, saímos
     * comentou - você pode ou não querer implementar este
     * funcionalidade desta forma (você poderia apenas implementar a detecção de colisão
     * nas próprias entidades dentro do seu arquivo app.js).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    /* Isso é chamado pela função de atualização e percorre todos os
     * objetos dentro de sua matriz allEnemies conforme definido em app.js e chamadas
     * seus métodos update (). Em seguida, ele chamará a função de atualização para o seu
     * objeto do jogador. Esses métodos de atualização devem focar puramente na atualização
     * os dados / propriedades relacionados ao objeto. Faça o seu desenho na sua
     * renderiza métodos.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* Esta função inicialmente desenha o "nível do jogo", ele irá então chamar
     * a função renderEntities. Lembre-se, esta função é chamada de
     * tick do jogo (ou loop do mecanismo do jogo) porque é assim que os jogos funcionam -
     * eles são flipbooks criando a ilusão de animação, mas na realidade
     * Eles estão apenas desenhando a tela inteira repetidamente.
     */
    function render() {
        /* Este array contém o URL relativo para a imagem usada
         * para essa linha específica do nível do jogo.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Antes de desenhar, limpe a tela existente
        ctx.clearRect(0,0,canvas.width,canvas.height);

        /* Repetir o número de linhas e colunas que definimos acima
         * e, usando o array rowImages, desenhe a imagem correta para
         * porção da "grade"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* A função drawImage do elemento de contexto da tela
                 * requer 3 parâmetros: a imagem a desenhar, a coordenada x
                 * para começar a desenhar e a coordenada y para começar a desenhar.
                 * Estamos usando nossos ajudantes de Recursos para se referir a nossas imagens
                 * para obtermos os benefícios do armazenamento em cache dessas imagens,
                 * Estamos usando-os repetidamente.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* Esta função é chamada pela função render e é chamada em cada jogo
     * Carraça. Sua finalidade é, então, chamar as funções de renderização que você definiu
     * em seu inimigo e entidades de jogador dentro de app.js
     */
    function renderEntities() {
        /* Faz um loop através de todos os objetos dentro da matriz allEnemies e chama
         * a função de renderização que você definiu.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    /* Esta função não faz nada, mas poderia ter sido um bom lugar para
     * lidar com os estados de redefinição do jogo - talvez um novo menu de jogo ou um jogo sobre a tela
     * esse tipo de coisa. É chamado apenas uma vez pelo método init ().
     */
    function reset() {
        // noop
    }

    /* Vá em frente e carregue todas as imagens que sabemos que precisaremos
     * desenhe nosso nível de jogo. Em seguida, defina init como o método de retorno de chamada, para que quando
     * todas essas imagens estão carregadas corretamente nosso jogo vai começar.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    /* Atribui o objeto de contexto da tela à variável global (a janela
     * objeto quando executado em um navegador para que os desenvolvedores possam usá-lo mais facilmente
     * de dentro de seus arquivos app.js.
     */
    global.ctx = ctx;
})(this);
