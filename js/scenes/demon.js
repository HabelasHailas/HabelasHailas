"use strict"

class Demon{
    constructor(context, index) {
        this.demon = null;
        this.demContext = context;
        this.index = index;
        this.hasWaved = false;
    }
    preloadDemon(){
        this.demContext.load.spritesheet('demon', '../../sprites/demonios/MAGE.png', { frameWidth: 64, frameHeight: 64 });

    }
    createDemon(){
        this.demon = this.demContext.physics.add.sprite(0, 0, 'demon').setScale(1.5).refreshBody();
        this.demon.body.setSize(80, 80);
        this.demon.body.setOffset(-10, 10);
        switch(this.index){
            case 0: this.demon.setPosition(200,200); break;
            case 1: this.demon.setPosition(100,200); break;
            case 2: this.demon.setPosition(200,300); break;
            case 3: this.demon.setPosition(200,100); break;
        }          
        
        //#region animaciones demonio
        this.demContext.anims.create({
            key:'demIdle',
            frames: this.demContext.anims.generateFrameNumbers('demon',{start: 0, end: 7}),
            frameRate: 7,
            repeat: -1
         });
        this.demContext.anims.create({
            key:'demEmote',
            frames: this.demContext.anims.generateFrameNumbers('demon',{start: 9, end: 16}),
            frameRate: 7,
            repeat: 0
         });
        this.demContext.anims.create({
            key:'demDie',
            frames: this.demContext.anims.generateFrameNumbers('demon',{start:64 , end: 72}),
            frameRate: 7,
            repeat: 0
         });
        //#endregion

        this.demon.anims.play('demIdle',true);
    }
    enterDemonRange(){
        if(!this.hasWaved){
            this.hasWaved = true;
            this.demon.anims.play('demEmote',false);
            this.demon.once('animationcomplete',() => {
                this.hasWaved = false;            
            }); 
        }        
    }
}