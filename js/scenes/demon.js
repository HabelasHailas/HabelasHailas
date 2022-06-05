"use strict"

class Demon{
    constructor(context, index, options) {
        if(options == null){
            this.demon = null;
            this.index = index;
            this.isCollected = false;
        }
        else{
            this.demon = options.demon;
            this.index = options.index;
            this.isCollected = options.saved;            
        }
        this.demContext = context;
        this.hasWaved = false;
    }
    getSaveData(){
        var demonData = {
            demon: this.demon,
            index: this.index,
            saved: this.isCollected
        };
        return demonData;
    }
    preloadDemon(){
        
        switch(this.index){
            case 0: this.demContext.load.spritesheet('demon'+this.index, '../../sprites/demonios/demon_blue.png', { frameWidth: 64, frameHeight: 64 }); break;
            case 1: this.demContext.load.spritesheet('demon'+this.index, '../../sprites/demonios/demon_orange.png', { frameWidth: 64, frameHeight: 64 }); break;
            case 2: this.demContext.load.spritesheet('demon'+this.index, '../../sprites/demonios/demon_purple.png', { frameWidth: 64, frameHeight: 64 }); break;
            case 3: this.demContext.load.spritesheet('demon'+this.index, '../../sprites/demonios/demon_red.png', { frameWidth: 64, frameHeight: 64 }); break;
        }  
    }
    createDemon(){
        this.demon = this.demContext.physics.add.sprite(0, 0, 'demon'+this.index).setScale(1.5).refreshBody();
        this.demon.body.setSize(80, 80);
        this.demon.body.setOffset(-10, 10);
        switch(this.index){
            case 0: this.demon.setPosition(232,645); break;
            case 1: this.demon.setPosition(2475,730); break;
            case 2: this.demon.setPosition(2024,1353); break;
            case 3: this.demon.setPosition(1104,1855); break;
        }          
        this.demon.name = String(this.index);
        if(this.isCollected){
            this.demon.visible = false;
        }
        
        //#region animaciones demonio
        this.demContext.anims.create({
            key:'demIdle'+this.index,
            frames: this.demContext.anims.generateFrameNumbers('demon'+this.index,{start: 0, end: 7}),
            frameRate: 7,
            repeat: -1
         });
        this.demContext.anims.create({
            key:'demEmote'+this.index,
            frames: this.demContext.anims.generateFrameNumbers('demon'+this.index,{start: 8, end: 15}),
            frameRate: 7,
            repeat: 0
         });
        this.demContext.anims.create({
            key:'demDie'+this.index,
            frames: this.demContext.anims.generateFrameNumbers('demon'+this.index,{start:65 , end: 72}),
            frameRate: 7,
            repeat: 0
         });
        //#endregion

        this.demon.anims.play('demIdle'+this.index,true);
    }
    enterDemonRange(){
        if(!this.hasWaved && !this.isCollected){
            this.hasWaved = true;
            this.demon.anims.play('demEmote'+this.index,false);
            this.demon.once('animationcomplete',() => {
                this.demon.anims.play('demIdle'+this.index,true);      
            }); 
        }        
    }

    collectDemon(){
        if(!this.isCollected){
            this.isCollected = true;
            this.demon.anims.play('demDie'+this.index,false);
                this.demon.once('animationcomplete',() => {
                    this.demon.destroy();     
                }); 
           this.demContext.points += 1;
        }
    }
}