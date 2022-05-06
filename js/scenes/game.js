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
        //#endregion
      
    }

    update(){

        //#region INPUT TECLADO 
        if (this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.anims.play('right',true);
            this.player.flipX = false;
        }
        if (this.cursors.up.isDown){
            this.player.setVelocityY(-160);
            this.player.anims.play('right',true);
        }
        if (this.cursors.down.isDown){
            this.player.setVelocityY(160);
            this.player.anims.play('right',true);
        }
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.anims.play('left',true);
            this.player.flipX = true;
        }
        if(this.cursors.right.isUp && this.cursors.up.isUp
             && this.cursors.down.isUp && this.cursors.left.isUp) { //mirar que no se pulse ninguna de las 4 teclas direccionales
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.play('idle', true);
        }
        //#endregion
    }
}