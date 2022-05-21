"use strict";

class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
        // this.player = null;
        this.player = new Player(this);
        this.enemy = new Enemies(this);
    }
       
    preload(){
        // this.load.spritesheet      
        this.player.preloadPlayer();  
        this.enemy.preloadEnemy();
        
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh(); 
        // this.player = this.add.player(100,100,'player')
    }

    create(){   
        this.player.createPlayer();
        this.enemy.createEnemy();    
    }  
    update(){        
        this.player.updateStates();
        this.enemy.updateEnemy();
    }
}

