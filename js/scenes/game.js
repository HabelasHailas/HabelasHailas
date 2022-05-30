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
        this.enemy.createEnemy(); 
        this.player.createPlayer();
        
        this.physics.add.collider(this.player.attackProjectile, this.enemy);

        this.physics.add.overlap(this.player.attackProjectile,this.enemy.enemy,(body1,body2)=>this.attackDone(body1,body2));
    }  
    update(){      
        this.enemy.updateEnemy();
        this.player.updateStates();
    }

    attackDone(player,enemy){
        if(player.frame.name == 0) return;
        this.enemy.en_actualState = 3;
    }
}

