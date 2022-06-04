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
    fromHit = false;
    firstHit = true;
    isDead = false;
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
        this.enemyContext.load.spritesheet('enemyDie','../../sprites/enemigos/Hyena_death2.png', {frameWidth: 48, frameHeight: 48});
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
            repeat: 0
         });
         this.enemyContext.anims.create({
            key:'enDie',
            frames: this.enemyContext.anims.generateFrameNumbers('enemyDie',{start: 0, end: 7}),
            frameRate: 5,
            repeat: 0
         });
    //#endregion
      
    }

    playAnim(anim){
        this.enemy.anims.play(anim,true);
    }

    changeState(state){
        if(!this.isDead){
            this.en_actualState = state;
        }
    }
    
    enemyIdle(){
        this.firstHit = true;
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
        this.firstHit = true;
        this.playAnim('enWalk');
        if(this.enemy.x <= this.pointOne){
            this.enemy.flipX = true;
            this.en_actualState = STATE_IDLE_en;
        }
        else if (this.enemy.x >= this.pointwo){
            this.enemy.flipX = false;
            this.en_actualState = STATE_IDLE_en;
        }
        
        if(this.enemy.flipX){
            this.enemy.setVelocityX(160);
        }
        else{
            this.enemy.setVelocityX(-160);
        }
        // if(!this.fromHit){
        //     if(this.enemy.x <= this.pointOne){ 
        //         if(this.firstWalk){
        //             this.enemy.flipX = true;
        //             this.enemy.setVelocityX(160);
        //             this.firstWalk = false;
        //         }
        //         else{
        //             this.firstWalk = true;
        //             this.en_actualState = STATE_IDLE_en; 
        //         }    
        //     }
        //     else if (this.enemy.x >= this.pointwo){
        //         if(this.firstWalk){
        //             this.enemy.flipX = false;
        //             this.enemy.setVelocityX(-160);
        //             this.firstWalk = false;
        //         }
        //         else{
        //             this.firstWalk = true;
        //             this.en_actualState = STATE_IDLE_en; 
        //         }
        //     }
        // }
        // else{
        //     if(this.enemy.flipX) this.enemy.setVelocityX(160);
        //     else  this.enemy.setVelocityX(-160);
        //     this.fromHit = false;
        
        // }

    }

    enemyDie(){
        this.en_actualState = STATE_DEAD_en;
        if(!this.isDead){
            this.isDead = true;
            this.enemy.setVelocityX(0);
            this.enemy.anims.play('enDie',false);
            this.enemy.once('animationcomplete',() => {
                this.enemy.destroy();                
            });            
        }
    }

    enemyDamage(){       
        // this.enemy.setVelocityX(0);
        // this.enemy.anims.play('enHit',false);
        // this.enemyGetHit();
        this.en_actualState = STATE_DEAD_en
        this.enemyDie();
    }
    // enemyGetHit(){
    //     console.log("VIDA",this.enemy_hitPoints);
    //     if(this.firstHit){
    //         this.enemy_hitPoints -= 1;
    //         this.firstHit = false;
    //     }
    //     if(this.enemy_hitPoints <= 0){
    //         this.en_actualState = STATE_DEAD_en;
    //         this.enemyDie();
    //     }
    //     else if(this.en_actualState != STATE_DEAD_en){
    //         this.en_actualState = STATE_WALK_en;
    //     }
    // }

    updateEnemy(){
        console.log(this.en_actualState);
        if(this.en_actualState != STATE_DEAD_en && !this.isDead){
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
                default:
                    this.enemy.setFrame(0);
                    break;
            }
        }
    }
}

