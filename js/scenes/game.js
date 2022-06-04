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
        this.load.image('woodSingBot','../sprites/woodSignBot.png')
        this.load.image('woodSingTop','../sprites/woodSignTop.png')

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh(); 
        // this.player = this.add.player(100,100,'player')
    }

    create(){   
        this.enemy.createEnemy(); 
        this.player.createPlayer();
        
        this.physics.add.collider(this.player.attackProjectile, this.enemy); //enemigo vs atac
        this.physics.add.collider(this.player, this.enemy); //enemigo vs bruja

        this.physics.add.overlap(this.player.attackProjectile,this.enemy.enemy,(body1,body2)=>this.attackDone(body1,body2));
        this.physics.add.overlap(this.player.player,this.enemy.enemy,(player,enemy)=>this.enemyHits(player,enemy));
    }  
    update(){      
        this.enemy.updateEnemy();
        this.player.updateStates();
    }

    attackDone(player,enemy){ //colision del ataque de la bruja vs enemigo
        if(player.frame.name == 0)  return;
        this.enemy.changeState(3);
    }

    enemyHits(player,enemy){ //colision del enemigo vs la bruja
        var sideCollided = '';
        if(player.body.touching.up){ sideCollided = 't';}
        if(player.body.touching.down){ sideCollided = 'd';}
        if(player.body.touching.left){ sideCollided = 'l';}
        if(player.body.touching.right){ sideCollided = 'r';}

        this.player.changeState(STATE_DAMAGE, sideCollided);
    }
}

