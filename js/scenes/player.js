"use strict"

class Player{
    key_a = null;
    key_s = null;
    key_d = null;
    key_w = null;
    key_e = null;
    constructor(context){
        this.context = context;
        this.player = null;
    }
    preloadPlayer(){
        this.context.load.spritesheet('characterIdle','../../sprites/character/B_witch_idle.png', {frameWidth: 32, frameHeight: 48});
        this.context.load.spritesheet('characterWalk','../../sprites/character/B_witch_run.png', {frameWidth: 32, frameHeight: 48});
        this.context.load.spritesheet('characterAttack','../../sprites/character/B_witch_attack.png', {frameWidth: 168, frameHeight: 46});
    }
    createPlayer(){
        this.player = this.context.physics.add.sprite(100,450,'characterIdle').setScale(2).refreshBody();
        this.player.setCollideWorldBounds(true);

        this.context.key_a = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.context.key_s = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.context.key_d = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.context.key_w = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.context.key_e = this.context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

         //#region ANIMACIONES JUGADOR
         this.context.anims.create({
            key:'right',
            frames: this.context.anims.generateFrameNumbers('characterWalk',{start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        this.context.anims.create({
            key:'left',
            frames: this.context.anims.generateFrameNumbers('characterWalk',{start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        this.context.anims.create({
            key:'idle',
            frames: this.context.anims.generateFrameNumbers('characterIdle',{start: 0, end: 5}),
            frameRate: 7,
            repeat: -1
        });
        this.context.anims.create({
            key:'attack',
            frames: this.context.anims.generateFrameNumbers('characterAttack',{start: 0, end: 8}),
            frameRate: 7            
        });
        // this.context.anims.create({
        //     key:'death',
        //     frames: this.context.anims.generateFrameNumbers('character',{start: 24, end: 26}),
        //     frameRate: 5
        // });
        //#endregion

    }
    updatePlayer(){        
        // Mates detrás de los numeros:
        // https://www.geogebra.org/calculator/qbbr4vb7

        if (this.context.key_e.isDown) {
            // Ataque
            this.player.anims.play('attack',true);
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        else if (this.context.key_d.isDown && this.context.key_w.isUp && this.context.key_s.isUp && this.context.key_a.isUp){
            // Derecha
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.anims.play('right',true);
            this.player.flipX = false;
        }
        else if (this.context.key_d.isDown && this.context.key_w.isDown && this.context.key_s.isUp && this.context.key_a.isUp){
            // Arriba + Derecha
            this.player.setVelocityX(113);
            this.player.setVelocityY(-113);
            this.player.anims.play('right',true);
            this.player.flipX = false;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isDown && this.context.key_s.isUp && this.context.key_a.isUp){
            // Arriba
            this.player.setVelocityX(0);
            this.player.setVelocityY(-160);
            this.player.anims.play('right',true);
        }
        else if (this.context.key_d.isUp && this.context.key_w.isDown && this.context.key_s.isUp && this.context.key_a.isDown){
            // Arriba + Izquierda
            this.player.setVelocityX(-113);
            this.player.setVelocityY(-113);
            this.player.anims.play('left',true);
            this.player.flipX = true;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isUp && this.context.key_s.isUp && this.context.key_a.isDown){
            // Izquierda
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
            this.player.anims.play('left',true);
            this.player.flipX = true;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isUp && this.context.key_s.isDown && this.context.key_a.isDown){
            // Abajo + Izquierda
            this.player.setVelocityX(-113);
            this.player.setVelocityY(113);
            this.player.anims.play('left',true);
            this.player.flipX = true;
        }
        else if (this.context.key_d.isUp && this.context.key_w.isUp && this.context.key_s.isDown && this.context.key_a.isUp){
            // Abajo
            this.player.setVelocityX(0);
            this.player.setVelocityY(160);
            this.player.anims.play('right',true);
        }
        else if (this.context.key_d.isDown && this.context.key_w.isUp && this.context.key_s.isDown && this.context.key_a.isUp){
            // Abajo + Derecha
            this.player.setVelocityX(113);
            this.player.setVelocityY(113);
            this.player.anims.play('right',true);
            this.player.flipX = false;
        }
        else { //mirar que no se pulse ninguna de las 4 teclas direccionales
            // if(this.context.cursors.right.isUp && this.context.cursors.up.isUp && this.context.cursors.down.isUp && this.context.cursors.left.isUp) 
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.play('idle', true);
        }
    }
}

