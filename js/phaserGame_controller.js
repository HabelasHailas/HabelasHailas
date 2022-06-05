var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    parent: 'game_area',
    physics: {
        default: 'arcade',
        arcade:{
            gravity: {y: 0},
            debug: true
        }
    },
    pixelArt: true,
    scene: [GameScene]
}; 

var game = new Phaser.Game(config);

 // Centrar el juego en la página
    