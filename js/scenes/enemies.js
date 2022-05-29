"use strict";

const STATE_IDLE_en = 0;
const STATE_WALK_en = 1;
const STATE_ATTACK_en = 2;
const STATE_DAMAGE_en = 3;
const STATE_DEAD_en = 4;


class Enemies{
    firstWalk = true;
    pointOne = 100;
    pointwo = 600;
    constructor(context){
        this.enemyContext = context;
        this.enemy = null;
        this.idleTimmer = 5000;
        this.en_actualState = STATE_IDLE_en;
        this.enemy_hitPoints = 2;
    }

    preloadEnemy(){
        this.enemyContext.load.spritesheet('enemyIdle','../../sprites/enemigos/Hyena_idle.png', {frameWidth: 48, frameHeight: 48});
        this.enemyContext.load.spritesheet('enemyWalk','../../sprites/enemigos/Hyena_walk.png', {frameWidth: 48, frameHeight: 48});
        this.enemyContext.load.spritesheet('enemyHit','../../sprites/enemigos/Hyena_hurt.png', {frameWidth: 48, frameHeight: 48});
    }

    createEnemy(){
        //#region enemy physics
        this.enemy = this.enemyContext.physics.add.sprite(100,450,'enemyIdle').setScale(1.5).refreshBody();
        this.enemy.setPosition(100,100);       
        this.enemy.setCollideWorldBounds(true);
        //#endregion  

        //#region animaciones enemigo
        this.enemyContext.anims.create({
            key:'enIdle',
            frames: this.enemyContext.anims.generateFrameNumbers('enemyIdle',{start: 0, end: 3}),
            frameRate: 7,
            repeat: -1
         });
        this.enemyContext.anims.create({
            key:'enWalk',
            frames: this.enemyContext.anims.generateFrameNumbers('enemyWalk',{start: 0, end: 5}),
            frameRate: 9,
            repeat: -1
         });
         this.enemyContext.anims.create({
            key:'enHit',
            frames: this.enemyContext.anims.generateFrameNumbers('enemyHit',{start: 0, end: 1}),
            frameRate: 9,
            repeat: -1
         });
    //#endregion
      
    }

    playAnim(anim){
        this.enemy.anims.play(anim,true);
    }
    
    enemyIdle(){
        this.enemy.setVelocityX(0);
        this.playAnim('enIdle');
        this.enemyContext.time.addEvent({
            delay: this.idleTimmer,
            callback: () =>{
                this.en_actualState = STATE_WALK_en;
            },
            loop: false
        });
    }

    enemyWalk(){    
        this.playAnim('enWalk');
        if(this.enemy.x <= this.pointOne){ 
            if(this.firstWalk){
                this.enemy.flipX = true;
                this.enemy.setVelocityX(160);
                this.firstWalk = false;
            }
            else{
                this.en_actualState = STATE_IDLE_en; 
                this.firstWalk = true;
            }    
        }
        else if (this.enemy.x >= this.pointwo){
            if(this.firstWalk){
                this.enemy.flipX = false;
                this.enemy.setVelocityX(-160);
                this.firstWalk = false;
            }
            else{
                this.en_actualState = STATE_IDLE_en; 
                this.firstWalk = true;
            }
        }
    }

    enemyDamage(){
        //TODO: arreglar caminar de la hiena quan rep dany.
        var previousState = this.en_actualState;
        this.en_actualState = STATE_DAMAGE_en;
        this.enemy.setVelocityX(0);
        this.enemy.anims.play('enHit',false);
        this.enemy_hitPoints -= 1;
        // this.enemy.once('animationcomplete',() => {
        //     this.en_actualState = previousState;
        //     this.firstWalk = true;
        // });
        this.en_actualState = previousState;
    }

    updateEnemy(){
        switch (this.en_actualState){
            case STATE_IDLE_en:
                this.enemyIdle();
                break;
            case STATE_WALK_en:
                this.enemyWalk();
                break;
            case STATE_ATTACK_en:
                // this.attack();
                break;
            case STATE_DAMAGE_en:
                this.enemyDamage();
                break;
        }
    }
}

