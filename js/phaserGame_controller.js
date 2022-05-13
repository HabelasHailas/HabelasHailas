var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game_area',
    backgroundColor: '#39ac39',
    physics: {
        default: 'arcade',
        arcade:{
            gravity: {y: 0},
            debug: false
        }
    },
    pixelArt: true,
    scene: [GameScene]
};

var game = new Phaser.Game(config);