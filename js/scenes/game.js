class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
    }

    preload(){

    }

    create(){
        // Centrar el juego en la página
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();
    }

    update(){
        
    }
}