"use strict";

var saveBool = false;

class GameScene extends Phaser.Scene{
    jsonDemon = localStorage.getItem("demon") || '0';
    jsonPoints = localStorage.getItem("points") || 0;
    jsonPlayer = localStorage.getItem("player") || 100;
    demonOptions = JSON.parse(this.jsonDemon);
    playerPoints = JSON.parse(this.jsonPlayer);

    constructor(){
        super('GameScene');
        this.player = new Player(this,this.playerPoints);
        this.enemy = [];
        this.demon = [];
        this.points = JSON.parse(this.jsonPoints);
        this.banner = null;
        this.canWin = false;
        this.winCollision = null;
    }
       
    preload(){
        //#region load del mapa
            this.load.image('woodSingBot','https://habelashailas.github.io/HabelasHailas/sprites/woodSignBot.png')
            this.load.image('woodSingTop','https://habelashailas.github.io/HabelasHailas/sprites/woodSignTop.png')
            this.load.image('tilesGrass','https://habelashailas.github.io/HabelasHailas/sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Tileset Grass.png')
            this.load.image('tilesPlant','https://habelashailas.github.io/HabelasHailas/sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Plant.png')
            this.load.image('tilesProps','https://habelashailas.github.io/HabelasHailas/sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Props.png')
            this.load.image('tilesShadowPlants','https://habelashailas.github.io/HabelasHailas/sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Shadow Plant.png')
            this.load.image('tilesShadow','https://habelashailas.github.io/HabelasHailas/sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Shadow.png')
            this.load.image('tilesStruct','https://habelashailas.github.io/HabelasHailas/sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Struct.png')
            this.load.image('tilesStone','https://habelashailas.github.io/HabelasHailas/sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Tileset Stone Ground.png')
            this.load.image('tilesWall','https://habelashailas.github.io/HabelasHailas/sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Tileset Wall.png')

            this.load.tilemapTiledJSON('map',"https://habelashailas.github.io/HabelasHailas/Map/TileMap.tmj");
        //#endregion
        
        this.load.image('banner_ini','https://habelashailas.github.io/HabelasHailas/sprites/banner_inicio.png');
        this.load.image('banner_fin','https://habelashailas.github.io/HabelasHailas/sprites/banner_final.png');

        this.load.image('VidaMIN','https://habelashailas.github.io/HabelasHailas/sprites/HUD/woodSignTop3.png');
        this.load.image('VidaMAX','https://habelashailas.github.io/HabelasHailas/sprites/HUD/woodSignTop1.png');
        this.load.image('ManaMIN','https://habelashailas.github.io/HabelasHailas/sprites/HUD/woodSignTop4.png');
        this.load.image('ManaMAX','https://habelashailas.github.io/HabelasHailas/sprites/HUD/woodSignTop2.png');

        this.load.image('demon4-red','https://habelashailas.github.io/HabelasHailas/sprites/demonios/Demon_Faces1.png');
        this.load.image('demon3-purple','https://habelashailas.github.io/HabelasHailas/sprites/demonios/Demon_Faces2.png');
        this.load.image('demon1-orange','https://habelashailas.github.io/HabelasHailas/sprites/demonios/Demon_Faces3.png');
        this.load.image('demon0-blue','https://habelashailas.github.io/HabelasHailas/sprites/demonios/Demon_Faces4.png');

        this.player.preloadPlayer(); 
        for(var i = 0; i < 4; i++){
            if(this.demonOptions == '0')
                this.demon[i] = new Demon(this,i,null);
            else
                this.demon[i] = new Demon(this,i,this.demonOptions[i]);
            this.demon[i].preloadDemon();
        }
        for(var i = 0; i < 10; i++){
            this.enemy[i] = new Enemies(this,i);

            this.enemy[0].preloadEnemy();   
        }

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();         
    
    }
    create(){   
        //#region crear mapa tiles
            var map = this.make.tilemap({
                key: "map",
                tileWidth: 32, 
                tileHeight: 32
            });
            const tilesetGrass = map.addTilesetImage("TX Tileset Grass", "tilesGrass");
            var tilesetWalls = map.addTilesetImage("TX Tileset Wall", "tilesWall");
            const tilesetStruct = map.addTilesetImage("TX Struct", "tilesStruct");
            const tilesetShadow = map.addTilesetImage("TX Shadow", "tilesShadow");
            const tilesetProps = map.addTilesetImage("TX Props", "tilesProps");
            const tilesetPlant = map.addTilesetImage("TX Plant", "tilesPlant");
            const tilesetProps2 = map.addTilesetImage("TX Props", "tilesProps");
            const tilesetPlants2 = map.addTilesetImage("TX Plant", "tilesPlant");

            
            const layerGrass = map.createLayer("Grass",tilesetGrass,0,0);
            var layerWalls = map.createLayer("Walls",tilesetWalls,0,0);
            const layerStruct = map.createLayer("Struct",tilesetStruct,0,0);
            const layerShadow = map.createLayer("Shadow",tilesetShadow,0,0);
            const layerProps = map.createLayer("Props",tilesetProps,0,0);
            const layerPlant = map.createLayer("Plant",tilesetPlant,0,0);
            const layerProps2 = map.createLayer("Props2",tilesetProps,0,0);
            const layerPlants2 = map.createLayer("Plants2",tilesetPlants2,0,0);
            
            
            
            layerGrass.setScale(1.3);
            layerWalls.setScale(1.3);
            layerStruct.setScale(1.3);
            layerShadow.setScale(1.3);
            layerProps.setScale(1.3);
            layerPlant.setScale(1.3);
            layerProps2.setScale(1.3);
            layerPlants2.setScale(1.3);

            //#endregion

            this.banner = this.add.sprite(450,300,'banner_ini').setScrollFactor(0);
            this.player.createPlayer();
            for(var i = 0; i < 4; i++){ this.demon[i].createDemon(); }
            for(var i = 0; i < 10; i++){ this.enemy[i].createEnemy(); }
            
            this.winCollision = this.physics.add.sprite(1604, 470).setScale(3).refreshBody();
            this.alreadyWon = false;
            
            
            //#region COLISIONES
            for(var i = 0; i < 4; i++)  this.physics.add.collider(this.player, this.demon[i]); 
            for(var i = 0; i < 10; i++)  this.physics.add.collider(this.player.attackProjectile, this.enemy[i]); 
            for(var i = 0; i < 10; i++)  this.physics.add.collider(this.player, this.enemy[i]);
            this.physics.add.collider(this.player, this.winCollision); 
            
            for(var i = 0; i < 10; i++)  
            this.physics.add.overlap(this.player.attackProjectile,this.enemy[i].enemy,(body1,body2)=>this.attackDone(body1,body2));
            for(var i = 0; i < 10; i++)  
            this.physics.add.overlap(this.player.player,this.enemy[i].enemy,(player,enemy)=>this.enemyHits(player,enemy));
            for(var i = 0; i < 4; i++)  
            this.physics.add.overlap(this.player.player,this.demon[i].demon,(player,demon)=>this.enterDemon(player,demon));
            this.physics.add.overlap(this.player.player,this.winCollision,(player,coll)=>this.winCondition(player,coll));
            
            //#endregion
            
            
            this.cameras.main.setBounds(0,0,3120,2370);
            this.physics.world.setBounds(0,0,3120,2370);
            this.cameras.main.startFollow(this.player.player);
            
            this.time.addEvent({
                delay: 8000,
                callback: () =>{
                    this.banner.visible = false;
                },
                loop: false
            });
            
            this.HUDVida_fons = this.add.sprite(120,20,'VidaMIN').setScrollFactor(0);
            this.HUDVida_actual = this.add.sprite(120,20,'VidaMAX').setScrollFactor(0);
            this.actualitzarVida(this.player.hitPoints,this.player.MAX_VIDA);

            this.espaiDimonis = 50;

            this.HUDDimoni0 = this.add.sprite(50,50,'demon0-blue').setScrollFactor(0);
            this.HUDDimoni1 = this.add.sprite(this.HUDDimoni0.x + this.espaiDimonis,this.HUDDimoni0.y,'demon1-orange').setScrollFactor(0);
            this.HUDDimoni2 = this.add.sprite(this.HUDDimoni1.x + this.espaiDimonis,this.HUDDimoni0.y,'demon3-purple').setScrollFactor(0);
            this.HUDDimoni3 = this.add.sprite(this.HUDDimoni2.x + this.espaiDimonis,this.HUDDimoni0.y,'demon4-red').setScrollFactor(0);

            this.HUDDimoni0.scale = 2;
            this.HUDDimoni1.scale = 2;
            this.HUDDimoni2.scale = 2;
            this.HUDDimoni3.scale = 2;

            this.HUDDimoni0.visible = false;
            this.HUDDimoni1.visible = false;
            this.HUDDimoni2.visible = false;
            this.HUDDimoni3.visible = false;
        }
    update(){     

        this.player.updateStates();
        for(var i = 0; i < 10; i++){ this.enemy[i].updateEnemy(); }

        if(this.points == 4 && this.banner.visible == false){
            this.showEndGameMessage();
            this.canWin = true;
        }

        if(saveBool){
            this.saveData();
            saveBool = false;
        }
    }
    attackDone(player,enemy){ //colision del ataque de la bruja vs enemigo
        if(player.frame.name == 0)  return;
        this.enemy[parseInt(enemy.name)].changeState(3);
    }
    enemyHits(player,enemy){ //colision del enemigo vs la bruj
        console.log(enemy.name);
        var sideCollided = '';
        if(player.body.touching.up){ sideCollided = 't';}
        if(player.body.touching.down){ sideCollided = 'd';}
        if(player.body.touching.left){ sideCollided = 'l';}
        if(player.body.touching.right){ sideCollided = 'r';}

        this.player.changeState(STATE_DAMAGE, sideCollided);
    }
    enterDemon(player,demon){        
        this.demon[parseInt(demon.name)].enterDemonRange();
        if(this.player.isCharging){
            this.time.addEvent({
                delay: 1500,
                callback: () =>{
                    this.demon[parseInt(demon.name)].collectDemon();
                    for (var i = 0; i < 4; i++){
                        if (this.demon[i].isCollected){
                                    /* demon4-red
                                       demon3-purple
                                       demon1-orange
                                       demon0-blue  */
                            if ( i == 0) this.HUDDimoni0.visible = true;
                            else if ( i == 1) this.HUDDimoni1.visible = true;
                            else if ( i == 2) this.HUDDimoni2.visible = true;
                            else if ( i == 3) this.HUDDimoni3.visible = true;
                        }
                    }
                    
                },
                loop: false
            });
        }
    }

    showEndGameMessage(){
        this.banner = this.add.sprite(450,300,'banner_fin').setScrollFactor(0);
        this.banner.visible = true;
        this.time.addEvent({
            delay: 6000,
            callback: () =>{
                this.banner.visible = false;
            },
            loop: false
        });
    }
    winCondition(pl,col){
        if(this.canWin && !this.alreadyWon){
            this.alreadyWon = true;
            this.victory();
        }
    }
    actualitzarVida(vidaActual, vidaMax){
        let crop = vidaActual/vidaMax * this.HUDVida_actual.width;
        this.HUDVida_actual.setCrop(0,0,crop,16);
    }
    saveData(){
        var demonsData = []
        for(var i = 0; i < 4; i++) demonsData.push(this.demon[i].getSaveData());

        localStorage.setItem('demon',JSON.stringify(demonsData));
        localStorage.setItem('points',JSON.stringify(this.points));
        localStorage.setItem('player', JSON.stringify(this.player.hitPoints));
    }
    morir(){

        var manCamera = this.cameras.main;
        manCamera.shake(500);
        
        this.time.addEvent({
            delay: 2000,
            callback: () =>{
                manCamera.fadeOut(2000);
                this.time.addEvent({
                    delay: 4000,
                    callback: () =>{
                        window.location.assign('../index.html');
                    },
                    loop: false
                });
            },
            loop: false
        });
    }
    victory(){
        var manCamera = this.cameras.main;

        this.player.win();
        this.time.addEvent({
            delay: 2000,
            callback: () =>{
                
                manCamera.fadeOut(5000);
                this.time.addEvent({
                    delay: 6000,
                    callback: () =>{
                        this.scene.stop('gameScene').launch('victoryScene');   
                    },
                    loop: false
                });
            },
            loop: false
        });
    }
}

