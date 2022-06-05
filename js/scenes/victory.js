"use strict";


class victoryScene extends Phaser.Scene{

    constructor(){
        super('victoryScene');
    }
    preload() {
        
    }
    create() {
        console.log("patata");
        var manCamera = this.cameras.main;
        manCamera.fadeIn(2000);

        this.HUDVida_fons = this.add.sprite(120,20,'VidaMIN').setScrollFactor(0);

    }
}