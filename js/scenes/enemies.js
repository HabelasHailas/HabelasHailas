"use strict";

const STATE_IDLE_en = 0;
const STATE_WALK_en = 1;
const STATE_ATTACK_en = 2;
const STATE_DAMAGE_en = 3;
const STATE_DEAD_en = 4;


class Enemies{
    constructor(context){
        this.enemyContext = context;
        this.enemy = null;
        this.idleTimmer = 2000;
        this.en_actualState = STATE_IDLE_en;
    }

    preloadEnemy(){
        this.enemyContext.load.spritesheet('enemyIdle','../../sprites/enemigos/Hyena_idle.png', {frameWidth: 48, frameHeight: 48});
        this.enemyContext.load.spritesheet('enemyWalk','../../sprites/enemigos/Hyena_walk.png', {frameWidth: 48, frameHeight: 48});
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
    //#endregion
      
    }

    playAnim(anim){
        this.enemy.anims.play(anim,true);
    }
    
    enemyIdle(){
        this.playAnim('enIdle');
        this.enemyContext.time.addEvent({
            delay: this.idleTimmer,
            callback: () =>{
                this.en_actualState = STATE_WALK_en;
            },
            loop: false
        });


        // var counter = game.time.now + this.idleTimmer;
        // while(counter >= 0){
        //     this.playAnim('enIdle');
        //     counter -= 1;
        //     console.log(counter);
        // }
        // this.en_actualState = STATE_WALK_en;
    }

    updateEnemy(){

        switch (this.en_actualState){
            case STATE_IDLE_en:
                this.enemyIdle();
                break;
            case STATE_WALK_en:
                this.playAnim('enWalk');
                break;
            case STATE_ATTACK_en:
                // this.attack();
                break;
            case STATE_DAMAGE_en:
                // this.takeDamage();
                break;
        }

    }
}

