var config = {
    type: Phaser.AUTO,
    width: 1020,
    height: 980,
    parent: 'game_area',
    scene: [gameScene]
};

var game = new Phaser.game(config);