class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
    }

    preload(){

    }

    create(){
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();
    }

    update(){
        
    }
}