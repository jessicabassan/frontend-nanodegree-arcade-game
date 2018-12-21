// Inicia e adiciona imagem do inimigo
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Determina velocidade variavel do inimigo,
// valida e reinicia o jogo caso haja 
// colisão entre inimigo e jogador
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };
    
    if (player.x <= this.x + 80 &&
        player.x + 80 >= this.x &&
        player.y <= this.y + 60 &&
        60 + player.y >= this.y) {
        
        setTimeout(() => {
            player.x = 202;
            player.y = 405;
        }, 250);
    };
};

// Renderiza imagem do inimigo
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Configura posição e velicidade inicial dos inimigos
var enemyPosition = [64, 147, 230];
var allEnemies = [];
enemyPosition.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 350);
    allEnemies.push(enemy);
});

// Inicia e adiciona imagem do jogador
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-pink-girl.png';
};

Player.prototype.update = function (dt) {};

// Renderiza imagem do jogador
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Valida movimentos do jogador
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 50;
    };
    if (keyPress == 'right' && this.x < 405) {
        this.x += 50;
    };

    if (keyPress == 'up' && this.y > 0) {
        this.y -= 40;
    };

    if (keyPress == 'down' && this.y < 405) {
        this.y += 40;
    };
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 250);
    };
};

// Configura posição inicial do jogador
var player = new Player(202, 405);

// Escuta de teclas pressionadas para movimentação do jogador
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});