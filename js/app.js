// Inimigos
var Enemy = function() {
    // Variáveis aplicadas a cada uma das nossas instâncias aqui,
    // nós fornecemos um para você começar

    // A imagem sprite dos nossos inimigos, isso usa
    // um ajudante que fornecemos para carregar facilmente imagens
    this.sprite = 'images/enemy-bug.png';
};

// Atualiza a posição do inimigo, método obrigatório para o jogo
// Parâmetro: dt, um delta de tempo entre carrapatos
Enemy.prototype.update = function(dt) {
    // Você deve multiplicar qualquer movimento pelo parâmetro dt
    // que garantirá que o jogo seja executado na mesma velocidade
    // todos os computadores.
};

// Desenhe o inimigo na tela, método obrigatório para o jogo
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Agora escreva sua própria classe de jogador
// Esta classe requer uma atualização (), render () e
// um método handleInput ().

// Agora instancie seus objetos.
// Coloque todos os objetos inimigos em uma matriz chamada allEnemies
// Coloque o objeto jogador em uma variável chamada jogador



// Isso ouve as teclas pressionadas e envia as chaves para o seu
// Método Player.handleInput (). Você não precisa modificar isso.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
