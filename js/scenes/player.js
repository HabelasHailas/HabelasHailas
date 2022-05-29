"use strict"

const STATE_IDLE = 0;
const STATE_WALK = 1;
const STATE_DASH = 2;
const STATE_ATTACK = 3;
const STATE_DAMAGE = 4;
const STATE_DEAD = 5;

class Player {     

    key_a = null;
    key_s = null;
    key_d = null;
    key_w = null;
    key_e = null;

    constructor(context) {
        this.context = context;
        this.player = null;
        this.hitPoints = 100;
        this.actualState = STATE_IDLE;

        this.key_k = null;
    }
    preloadPlayer() {   
        this.context.load.spritesheet('characterIdle', '../../sprites/character/B_witch_idle.png', { frameWidth: 32, frameHeight: 48 });
        this.context.load.spritesheet('characterWalk', '../../sprites/character/B_witch_run.png', { frameWidth: 32, frameHeight: 48 });
        this.context.load.spritesheet('characterAttack', '../../sprites/character/B_witch_attack.png', { frameWidth: 168, frameHeight: 46 });
        this.context.load.spritesheet('characterDamage', '../../sprites/character/B_witch_take_damage.png', { frameWidth: 32, frameHeight: 48 });
        this.context.load.spritesheet('characterDeath', '../../sprites/character/B_witch_death.png', { frameWidth: 32, frameHeight: 48 });
    }
    createPlayer() {
        this.player = this.context.physics.add.sprite(100, 450, 'characterIdle').setScale(2).refreshBody();
        this.player.body.setSize(18, 40); //tamaño caja colision
        this.player.setCollideWorldBounds(true);

        this.context.key_a = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.context.key_s = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.context.key_d = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.context.key_w = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.context.key_e = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //SOLO PARA DEBUGUEAR!!!! **********************
        this.key_k = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

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
        // this.context.anims.create({
        //     key: 'death',
        //     frames: this.context.anims.generateFrameNumbers('characterDeath', { start: 0, end: 11 }),
        //     frameRate: 5
        // });
        //#endregion

    }
    attack() {
        this.player.anims.play('attack', true);
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.body.setOffset(15, 0);
        this.player.once('animationcomplete',() => {
            this.actualState = STATE_IDLE;
        });

    }
    takeDamage() {
        this.actualState = STATE_DAMAGE;
        this.hitPoints -= 20;
        this.player.anims.play('damage', true);

        if (this.hitPoints <= 0) {
            this.actualState = STATE_DEAD;
        }  
        else{
            this.actualState = STATE_IDLE;
        }      
    }
    dead(){
        this.player.anims.play('death',false);
    }
    movePlayer() {
        if (this.context.key_d.isDown && this.context.key_w.isUp && this.context.key_s.isUp && this.context.key_a.isUp) {
            // Derecha
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.context.key_d.isDown && this.context.key_w.isDown && this.context.key_s.isUp && this.context.key_a.isUp) {
            // Arriba + Derecha
            this.player.setVelocityX(113);
            this.player.setVelocityY(-113);
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isDown && this.context.key_s.isUp && this.context.key_a.isUp) {
            // Arriba
            this.player.setVelocityX(0);
            this.player.setVelocityY(-160);
            this.player.anims.play('right', true);
        }
        else if (this.context.key_d.isUp && this.context.key_w.isDown && this.context.key_s.isUp && this.context.key_a.isDown) {
            // Arriba + Izquierda
            this.player.setVelocityX(-113);
            this.player.setVelocityY(-113);
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isUp && this.context.key_s.isUp && this.context.key_a.isDown) {
            // Izquierda
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isUp && this.context.key_s.isDown && this.context.key_a.isDown) {
            // Abajo + Izquierda
            this.player.setVelocityX(-113);
            this.player.setVelocityY(113);
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isUp && this.context.key_s.isDown && this.context.key_a.isUp) {
            // Abajo
            this.player.setVelocityX(0);
            this.player.setVelocityY(160);
            this.player.anims.play('right', true);
        }
        else if (this.context.key_d.isDown && this.context.key_w.isUp && this.context.key_s.isDown && this.context.key_a.isUp) {
            // Abajo + Derecha
            this.player.setVelocityX(113);
            this.player.setVelocityY(113);
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else { //mirar que no se pulse ninguna de las 4 teclas direccionales
            // if(this.context.cursors.right.isUp && this.context.cursors.up.isUp && this.context.cursors.down.isUp && this.context.cursors.left.isUp) 
            this.actualState = STATE_IDLE;
        }
    }
    idleState(){
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
    }
    
    updateStates(){
        if(this.key_k.isDown){
            this.takeDamage();
        }

        switch (this.actualState){
            case STATE_IDLE:
                this.idleState();
                break;
            case STATE_WALK:
                this.movePlayer();
                break;
            case STATE_DASH:
                break;
            case STATE_ATTACK:
                this.attack();
                break;
            case STATE_DAMAGE:
                this.takeDamage();
                break;
            // case STATE_DEAD:
            //     this.dead();
            //     break;
        }
    }
}

