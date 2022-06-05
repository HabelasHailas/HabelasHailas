"use strict";

const STATE_IDLE_en = 0;
const STATE_WALK_en = 1;
const STATE_ATTACK_en = 2;
const STATE_DAMAGE_en = 3;
const STATE_DEAD_en = 4;
const STATE_FOLLOW_en = 5;


class Enemies{
    firstWalk = true;
    pointOne = 0;
    pointwo = 0;
    fromHit = false;
    firstHit = true;
    

    constructor(context, index){ 
       
        this.enemy = null;
        this.en_index = index;
        this.isDead = false;             
        this.enemyContext = context;
        this.idleTimmer = Math.floor(Math.random()* (3000 - 5000)) + 3000;
        this.en_actualState = STATE_IDLE_en;
        this.enemy_hitPoints = 3;
    }
    
    preloadEnemy(){
        this.enemyContext.load.spritesheet('enemyIdle','../../sprites/enemigos/Hyena_idle.png', {frameWidth: 48, frameHeight: 48});
        this.enemyContext.load.spritesheet('enemyWalk','../../sprites/enemigos/Hyena_walk.png', {frameWidth: 48, frameHeight: 48});
        this.enemyContext.load.spritesheet('enemyHit','../../sprites/enemigos/Hyena_hurt.png', {frameWidth: 48, frameHeight: 48});
        this.enemyContext.load.spritesheet('enemyDie','../../sprites/enemigos/Hyena_death2.png', {frameWidth: 48, frameHeight: 48});
    }
    createEnemy(){
        //#region enemy physics
        this.enemy = this.enemyContext.physics.add.sprite(0,0,'enemyIdle').setScale(1.5).refreshBody();
        this.enemy.body.setSize(40, 30);       
        this.enemy.body.setOffset(2, 19);       
        this.enemy.setCollideWorldBounds(true);

        switch(this.en_index){
            case 0: 
                this.enemy.setPosition(1339,174); 
                this.pointOne = 1339;
                this.pointwo = 1975;
                break;
            case 1: 
                this.enemy.setPosition(1824,813); 
                this.pointOne = 1824;
                this.pointwo = 2385;
                break;
            case 2: 
                this.enemy.setPosition(1352,1285); 
                this.pointOne = 1352;
                this.pointwo = 2207;
                break;
            case 3: 
                this.enemy.setPosition(2129,1488); 
                this.pointOne = 1679;
                this.pointwo = 2129;
                break;
            case 4: 
                this.enemy.setPosition(813,1746); 
                this.pointOne = 813;
                this.pointwo = 1441;
                break;
            case 5: 
                this.enemy.setPosition(707,1613); 
                this.pointOne = 707;
                this.pointwo = 1092;
                break;
            case 6: 
                this.enemy.setPosition(245,1868); 
                this.pointOne = 245;
                this.pointwo = 665;
                break;
            case 7: 
                this.enemy.setPosition(160,971); 
                this.pointOne = 160;
                this.pointwo = 935;
                break;
            case 8: 
                this.enemy.setPosition(409,430); 
                this.pointOne = 409;
                this.pointwo = 794;
                break;
            case 9: 
                this.enemy.setPosition(46,328); 
                this.pointOne = 46;
                this.pointwo = 376;
                break;            
        }
        this.enemy.name = String(this.en_index);
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
        this.en_actualState = STATE_DEAD_en
        this.enemy.setVelocityX(0);
        this.enemy.anims.play('enHit',false);
        this.enemyGetHit();
    }
    enemyGetHit(){
        console.log("VIDA ENEMIC",this.enemy_hitPoints);
        if(this.firstHit){
            this.enemy_hitPoints -= 1;
            this.firstHit = false;
        }
        if(this.enemy_hitPoints <= 0){
            this.en_actualState = STATE_DEAD_en;
            this.enemyDie();
        }
        else{
            this.en_actualState = STATE_WALK_en;
        }
    }
    enemyAttack(){

    }
    updateEnemy(){
        // this.nearCollision.setPosition(this.enemy.x, this.enemy.y); 
        switch (this.en_actualState){
            case STATE_IDLE_en:
                this.enemyIdle();
                break;
            case STATE_WALK_en:
                this.enemyWalk();
                break;
            case STATE_ATTACK_en:
                this.enemyAttack();
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

