"use strict";

class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
        this.player = null;
        this.enemy = null;
        this.key_a = null;
        this.key_s = null;
        this.key_d = null;
        this.key_w = null;
        this.key_e = null;
    }

    preload(){
        this.load.spritesheet('characterIdle','../../sprites/character/B_witch_idle.png', {frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('characterWalk','../../sprites/character/B_witch_run.png', {frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('characterAttack','../../sprites/character/B_witch_attack.png', {frameWidth: 168, frameHeight: 46});
        // this.load.spritesheet
        this.load.spritesheet('enemyIdle','../../sprites/enemigos/Hyena_idle.png', {frameWidth: 48, frameHeight: 48});

    }

    create(){
        // Centrar el juego en la página
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();

        this.player = this.physics.add.sprite(100,450,'characterIdle').setScale(2).refreshBody();
        this.player.setCollideWorldBounds(true);
        
        //#region enemy physics
        this.enemy = this.physics.add.sprite(100,450,'enemyIdle').setScale(1.5).refreshBody();
        this.enemy.setCollideWorldBounds(true);
        //#endregion

        //#region  captura entrada del teclado
        this.key_a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        //#endregion

        //#region ANIMACIONES JUGADOR
        this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('characterWalk',{start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('characterWalk',{start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'idle',
            frames: this.anims.generateFrameNumbers('characterIdle',{start: 0, end: 5}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key:'attack',
            frames: this.anims.generateFrameNumbers('characterAttack',{start: 0, end: 8}),
            frameRate: 7            
        });
        // this.anims.create({
        //     key:'death',
        //     frames: this.anims.generateFrameNumbers('character',{start: 24, end: 26}),
        //     frameRate: 5
        // });
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

    updatePlayer(){
        // Mates detrás de los numeros:
        // https://www.geogebra.org/calculator/qbbr4vb7

        if (this.key_e.isDown) {
            // Ataque
            this.player.anims.play('attack',true);
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        else if (this.key_d.isDown && this.key_w.isUp && this.key_s.isUp && this.key_a.isUp){
            // Derecha
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.anims.play('right',true);
            this.player.flipX = false;
        }
        else if (this.key_d.isDown && this.key_w.isDown && this.key_s.isUp && this.key_a.isUp){
            // Arriba + Derecha
            this.player.setVelocityX(113);
            this.player.setVelocityY(-113);
            this.player.anims.play('right',true);
            this.player.flipX = false;
        }
        else if (this.key_d.isUp && this.key_w.isDown && this.key_s.isUp && this.key_a.isUp){
            // Arriba
            this.player.setVelocityX(0);
            this.player.setVelocityY(-160);
            this.player.anims.play('right',true);
        }
        else if (this.key_d.isUp && this.key_w.isDown && this.key_s.isUp && this.key_a.isDown){
            // Arriba + Izquierda
            this.player.setVelocityX(-113);
            this.player.setVelocityY(-113);
            this.player.anims.play('left',true);
            this.player.flipX = true;
        }
        else if (this.key_d.isUp && this.key_w.isUp && this.key_s.isUp && this.key_a.isDown){
            // Izquierda
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
            this.player.anims.play('left',true);
            this.player.flipX = true;
        }
        else if (this.key_d.isUp && this.key_w.isUp && this.key_s.isDown && this.key_a.isDown){
            // Abajo + Izquierda
            this.player.setVelocityX(-113);
            this.player.setVelocityY(113);
            this.player.anims.play('left',true);
            this.player.flipX = true;
        }
        else if (this.key_d.isUp && this.key_w.isUp && this.key_s.isDown && this.key_a.isUp){
            // Abajo
            this.player.setVelocityX(0);
            this.player.setVelocityY(160);
            this.player.anims.play('right',true);
        }
        else if (this.key_d.isDown && this.key_w.isUp && this.key_s.isDown && this.key_a.isUp){
            // Abajo + Derecha
            this.player.setVelocityX(113);
            this.player.setVelocityY(113);
            this.player.anims.play('right',true);
            this.player.flipX = false;
        }
        else { //mirar que no se pulse ninguna de las 4 teclas direccionales
            // if(this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp && this.cursors.left.isUp) 
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.play('idle', true);
        }
    }

    updateEnemy(){
        this.enemy.anims.play('enemyIdle',true);
    }
    update(){

        this.updatePlayer();
        this.updateEnemy();

    }
}

