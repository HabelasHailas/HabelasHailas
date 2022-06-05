"use strict"

const STATE_IDLE = 0;
const STATE_WALK = 1;
const STATE_CHARGE = 2;
const STATE_ATTACK = 3;
const STATE_DAMAGE = 4;
const STATE_DEAD = 5;



class Player { 
    key_a = null;
    key_s = null;
    key_d = null;
    key_w = null;
    key_e = null;
    key_q = null;

    MAX_VIDA = 100;

    isAttacked = false;
    isCharging = false;
    collSide = '';


    velHorizontal = 300; //160
    velDiagonal = this.velHorizontal * Math.sin(Math.PI/4); //113
    
    attackProjectile;

    constructor(context,hp) {
        this.context = context;
        this.player = null;
        this.hitPoints = hp;
        this.actualState = STATE_IDLE;
        this.isDead = false;

    }
    preloadPlayer() {   
        this.context.load.spritesheet('characterIdle', '../../sprites/character/B_witch_idle.png', { frameWidth: 32, frameHeight: 48 });
        this.context.load.spritesheet('characterWalk', '../../sprites/character/B_witch_run.png', { frameWidth: 32, frameHeight: 48 });
        this.context.load.spritesheet('characterAttack', '../../sprites/character/B_witch_attack2.png', { frameWidth: 48, frameHeight: 48 });
        this.context.load.spritesheet('characterDamage', '../../sprites/character/B_witch_take_damage.png', { frameWidth: 32, frameHeight: 48 });
        this.context.load.spritesheet('characterDeath', '../../sprites/character/B_witch_death_2.png', { frameWidth: 32, frameHeight: 48 });
        this.context.load.spritesheet('characterCharge', '../../sprites/character/B_witch_charge.png', { frameWidth: 48, frameHeight: 48 });
        
        this.context.load.spritesheet('attackProjectile', '../../sprites/character/B_witch_attack_projectile.png', { frameWidth: 80, frameHeight: 46 });
    }
    createPlayer() {
        this.player = this.context.physics.add.sprite(1604, 449, 'characterIdle').setScale(2).refreshBody();
        this.player.body.setSize(18, 40); //tamaño caja colision
        this.player.setCollideWorldBounds(true);
        

        this.attackProjectile = this.context.physics.add.sprite((this.player.x*2)-5, this.player.y, 'attackProjectile').setScale(2).refreshBody();
        this.attackProjectile.body.setSize(80,35);


        this.context.key_a = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.context.key_s = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.context.key_d = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.context.key_w = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.context.key_e = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.context.key_q = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);


        //#region ANIMACIONES JUGADOR
        this.context.anims.create({
            key: 'right',
            frames: this.context.anims.generateFrameNumbers('characterWalk', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.context.anims.create({
            key: 'left',
            frames: this.context.anims.generateFrameNumbers('characterWalk', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.context.anims.create({
            key: 'idle',
            frames: this.context.anims.generateFrameNumbers('characterIdle', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });
        this.context.anims.create({
            key: 'attack',
            frames: this.context.anims.generateFrameNumbers('characterAttack', { start: 0, end: 8 }),
            frameRate: 7
        });
        this.context.anims.create({
            key: 'damage',
            frames: this.context.anims.generateFrameNumbers('characterDamage', { start: 0, end: 2 }),
            frameRate: 7
        });
        this.context.anims.create({
            key: 'death',
            frames: this.context.anims.generateFrameNumbers('characterDeath', { start: 0, end: 11 }),
            frameRate: 10
        });
        this.context.anims.create({
            key: 'charge',
            frames: this.context.anims.generateFrameNumbers('characterCharge', { start: 0, end: 4 }),
            frameRate: 10
        });
        this.context.anims.create({
            key: 'attackProjectile',
            frames: this.context.anims.generateFrameNumbers('attackProjectile', { start: 4, end: 8}),
            frameRate: 3
        });
        //#endregion

        
    }
    attack() {
        this.player.anims.play('attack', true);
        this.attackProjectile.anims.play('attackProjectile',true);
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.body.setOffset(13,3);
        this.player.once('animationcomplete',() => {
            this.actualState = STATE_IDLE;
            this.attackProjectile.setFrame(0);
        });

    }
    takeDamage() {
        this.actualState = STATE_DAMAGE;
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        if(!this.isAttacked){
            this.isAttacked = true;
            this.hitPoints -= 20;        
        }
        console.log("VIDA: " ,this.hitPoints);
        this.player.anims.play('damage', true);
        this.player.once('animationcomplete',() => {
            this.actualState = STATE_IDLE;
            this.isAttacked = false;
        });
        switch(this.collSide){
            case 't':this.player.setPosition(this.player.x, this.player.y + 3);  break;
            case 'd':this.player.setPosition(this.player.x, this.player.y - 3);  break;
            case 'l':this.player.setPosition(this.player.x + 5, this.player.y);  break;
            case 'r':this.player.setPosition(this.player.x - 5, this.player.y);  break;
        }
        this.projectilePosition();

        if (this.hitPoints <= 0) {
            this.actualState = STATE_DEAD;
        }     
        this.context.actualitzarVida(this.hitPoints,this.MAX_VIDA);
    }
    dead(){
        if(!this.isDead){
            this.isDead = true;
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.play('death',false);
            this.context.morir();
            this.player.once('animationcomplete',() => {
                //LOAD DEATH SCREEN
            });
        }
        // this.context.morir();
    }
    movePlayer() {
        if (this.context.key_d.isDown && this.context.key_w.isUp && this.context.key_s.isUp && this.context.key_a.isUp) {
            // Derecha
            this.player.setVelocityX(this.velHorizontal);
            this.player.setVelocityY(0);
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.context.key_d.isDown && this.context.key_w.isDown && this.context.key_s.isUp && this.context.key_a.isUp) {
            // Arriba + Derecha
            this.player.setVelocityX(this.velDiagonal);
            this.player.setVelocityY(-this.velDiagonal);
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isDown && this.context.key_s.isUp && this.context.key_a.isUp) {
            // Arriba
            this.player.setVelocityX(0);
            this.player.setVelocityY(-this.velHorizontal);
            this.player.anims.play('right', true);
        }
        else if (this.context.key_d.isUp && this.context.key_w.isDown && this.context.key_s.isUp && this.context.key_a.isDown) {
            // Arriba + Izquierda
            this.player.setVelocityX(-this.velDiagonal);
            this.player.setVelocityY(-this.velDiagonal);
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isUp && this.context.key_s.isUp && this.context.key_a.isDown) {
            // Izquierda
            this.player.setVelocityX(-this.velHorizontal);
            this.player.setVelocityY(0);
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isUp && this.context.key_s.isDown && this.context.key_a.isDown) {
            // Abajo + Izquierda
            this.player.setVelocityX(-this.velDiagonal);
            this.player.setVelocityY(this.velDiagonal);
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isUp && this.context.key_s.isDown && this.context.key_a.isUp) {
            // Abajo
            this.player.setVelocityX(0);
            this.player.setVelocityY(this.velHorizontal);
            this.player.anims.play('right', true);
        }
        else if (this.context.key_d.isDown && this.context.key_w.isUp && this.context.key_s.isDown && this.context.key_a.isUp) {
            // Abajo + Derecha
            this.player.setVelocityX(this.velDiagonal);
            this.player.setVelocityY(this.velDiagonal);
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else { //mirar que no se pulse ninguna de las 4 teclas direccionales
            // if(this.context.cursors.right.isUp && this.context.cursors.up.isUp && this.context.cursors.down.isUp && this.context.cursors.left.isUp) 
            this.actualState = STATE_IDLE;
        }
        this.projectilePosition();

    }
    idleState(){
        this.attackProjectile.setFrame(0);
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.body.setOffset(6, 3);
        
        this.player.anims.play('idle', true);

        if(this.context.key_d.isDown || this.context.key_w.isDown || this.context.key_s.isDown || this.context.key_a.isDown){
            this.actualState = STATE_WALK;
        }
        else if(this.context.key_e.isDown){
            this.actualState = STATE_ATTACK;
        }
        else if(this.context.key_q.isDown){
            this.actualState = STATE_CHARGE;
        }
    }
    chargingState(){
        this.isCharging = true;
        this.player.anims.play('charge', true);
        this.context.time.addEvent({
            delay: 2000,
            callback: () =>{
                this.actualState = STATE_IDLE;
                this.isCharging = false;
            },
            loop: false
        });
    }
    changeState(state, col){
        if(this.actualState != STATE_DEAD){
            this.actualState = state;
            this.collSide = col;
        }
    }
    projectilePosition(){
        if(this.player.flipX){
            this.attackProjectile.setPosition(this.player.x-105, this.player.y); 
            this.attackProjectile.flipX = true;
        }
        else{
            this.attackProjectile.flipX = false;
            this.attackProjectile.setPosition(this.player.x+100, this.player.y); 
        }
        this.attackProjectile.setFrame(0);
    }    
    getHitPoints(){
        return this.hitPoints;
    }
    updateStates(){
        console.log("x",this.player.x, "y", this.player.y);
        if(!this.isDead){
            switch (this.actualState){
                case STATE_IDLE:
                    this.idleState();
                    break;
                case STATE_WALK:
                    this.movePlayer();
                    break;
                case STATE_CHARGE:
                    this.chargingState();
                    break;
                case STATE_ATTACK:
                    this.attack();
                    break;
                case STATE_DAMAGE:
                    this.takeDamage();
                    break;
                case STATE_DEAD:
                    this.dead();
                    break;
            }
        }
    }
}

