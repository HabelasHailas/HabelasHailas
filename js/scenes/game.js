class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
        this.player = null;
        this.cursors = null;
    }

    preload(){
        this.load.spritesheet('character','../../sprites/characters/player.png',
        {frameWidth: 48, frameHeight: 48});
       

    }

    create(){
        // Centrar el juego en la página
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();

        this.player = this.physics.add.sprite(100,450,'character').setScale(3).refreshBody();
        this.player.setCollideWorldBounds(true);

        //captura entrada del teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //#region ANIMACIONES JUGADOR
        this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('character',{start: 6, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('character',{start: 6, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'idle',
            frames: this.anims.generateFrameNumbers('character',{start: 0, end: 5}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key:'attack',
            frames: this.anims.generateFrameNumbers('character',{start: 12, end: 15}),
            frameRate: 7
        });
        this.anims.create({
            key:'death',
            frames: this.anims.generateFrameNumbers('character',{start: 24, end: 26}),
            frameRate: 5
        });
        //#endregion
      
    }

    updatePlayer(){
        //#region INPUT TECLADO 

        // Mates detrás de los numeros:
        // https://www.geogebra.org/calculator/qbbr4vb7

        if (this.spacebar.isDown) {
            this.player.anims.play('attack',true);
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        else if (this.cursors.right.isDown && this.cursors.up.isUp
            && this.cursors.down.isUp && this.cursors.left.isUp){
            // Derecha
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.anims.play('right',true);
            this.player.flipX = false;
        }
        else if (this.cursors.right.isDown && this.cursors.up.isDown
            && this.cursors.down.isUp && this.cursors.left.isUp){
            // Arriba + Derecha
            this.player.setVelocityX(113);
            this.player.setVelocityY(-113);
            this.player.anims.play('right',true);
            this.player.flipX = false;
        }
        else if (this.cursors.right.isUp && this.cursors.up.isDown
            && this.cursors.down.isUp && this.cursors.left.isUp){
            // Arriba
            this.player.setVelocityX(0);
            this.player.setVelocityY(-160);
            this.player.anims.play('right',true);
        }
        else if (this.cursors.right.isUp && this.cursors.up.isDown
            && this.cursors.down.isUp && this.cursors.left.isDown){
            // Arriba + Izquierda
            this.player.setVelocityX(-113);
            this.player.setVelocityY(-113);
            this.player.anims.play('left',true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isUp && this.cursors.up.isUp
            && this.cursors.down.isUp && this.cursors.left.isDown){
            // Izquierda
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
            this.player.anims.play('left',true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isUp && this.cursors.up.isUp
            && this.cursors.down.isDown && this.cursors.left.isDown){
            // Abajo + Izquierda
            this.player.setVelocityX(-113);
            this.player.setVelocityY(113);
            this.player.anims.play('left',true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isUp && this.cursors.up.isUp
            && this.cursors.down.isDown && this.cursors.left.isUp){
            // Abajo
            this.player.setVelocityX(0);
            this.player.setVelocityY(160);
            this.player.anims.play('right',true);
        }
        else if (this.cursors.right.isDown && this.cursors.up.isUp
            && this.cursors.down.isDown && this.cursors.left.isUp){
            // Abajo + Derecha
            this.player.setVelocityX(113);
            this.player.setVelocityY(113);
            this.player.anims.play('right',true);
        }
        else { //mirar que no se pulse ninguna de las 4 teclas direccionales
            // if(this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp && this.cursors.left.isUp) 
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.play('idle', true);
        }
    }

    update(){

        this.updatePlayer();

    }
}

