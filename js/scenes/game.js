class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
    }

    preload(){
        this.load.spritesheet('character','../../sprites/characters/player.png',
        {frameWidth: 48, frameHeight: 48});
       

    }

    create(){
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();

        this.player = this.physics.add.sprite(100,450,'character').setScale(3).refreshBody();
        this.player.setCollideWorldBounds(true);
    }

    update(){
        
    }
}