"use strict";

class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
        // this.player = null;
        this.enemy = null;
        this.player = new Player(this);
    }
    
   
    preload(){
        // this.load.spritesheet      
        this.player.preloadPlayer();  
        this.load.spritesheet('enemyIdle','../../sprites/enemigos/Hyena_idle.png', {frameWidth: 48, frameHeight: 48});
        
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh(); 
        // this.player = this.add.player(100,100,'player')
        console.log(this.player);
    }

    create(){   
        this.player.createPlayer();
        //#region enemy physics
        this.enemy = this.physics.add.sprite(100,450,'enemyIdle').setScale(1.5).refreshBody();
        this.enemy.setPosition(100,100);
        
        this.enemy.setCollideWorldBounds(true);
        //#endregion       
                
        //#region animaciones enemigo
       this.anims.create({
            key:'enemyIdle',
            frames: this.anims.generateFrameNumbers('enemyIdle',{start: 0, end: 3}),
            frameRate: 7,
            repeat: -1
        });
        //#endregion
        
    }   
    updateEnemy(){
        this.enemy.anims.play('enemyIdle',true);
    }
    
    update(){        
        this.updateEnemy();
        console.log(this.player);
        this.player.updatePlayer();
    }
}

