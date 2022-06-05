"use strict";

class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
        // this.player = null;
        this.player = new Player(this);
        this.enemy = [];
        this.demon = [];
        this.points = 0;
        this.banner = null;
        this.canWin = false;
        this.winCollision = null;
    }
       
    preload(){
        //#region load del mapa
            this.load.image('woodSingBot','../sprites/woodSignBot.png')
            this.load.image('woodSingTop','../sprites/woodSignTop.png')
            this.load.image('tilesGrass','../sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Tileset Grass.png')
            this.load.image('tilesPlant','../sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Plant.png')
            this.load.image('tilesProps','../sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Props.png')
            this.load.image('tilesShadowPlants','../sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Shadow Plant.png')
            this.load.image('tilesShadow','../sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Shadow.png')
            this.load.image('tilesStruct','../sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Struct.png')
            this.load.image('tilesStone','../sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Tileset Stone Ground.png')
            this.load.image('tilesWall','../sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Tileset Wall.png')

            this.load.tilemapTiledJSON('map',"../Map/TileMap.tmj");
        //#endregion
        
        this.load.image('banner_ini','../sprites/banner_inicio.png');
        this.load.image('banner_fin','../sprites/banner_final.png');

        this.load.image('VidaMIN','../sprites/HUD/woodSignTop3.png');
        this.load.image('VidaMAX','../sprites/HUD/woodSignTop1.png');
        this.load.image('ManaMIN','../sprites/HUD/woodSignTop4.png');
        this.load.image('ManaMAX','../sprites/HUD/woodSignTop2.png');

        this.player.preloadPlayer(); 

        for(var i = 0; i < 4; i++){
            this.demon[i] = new Demon(this,i);
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
            const map = this.make.tilemap({
                key: "map",
                tileWidth: 32, 
                tileHeight: 32
            });
            const tilesetGrass = map.addTilesetImage("TX Tileset Grass", "tilesGrass");
            const tilesetWalls = map.addTilesetImage("TX Tileset Wall", "tilesWall");
            const tilesetStruct = map.addTilesetImage("TX Struct", "tilesStruct");
            const tilesetShadow = map.addTilesetImage("TX Shadow", "tilesShadow");
            const tilesetProps = map.addTilesetImage("TX Props", "tilesProps");
            const tilesetPlant = map.addTilesetImage("TX Plant", "tilesPlant");
            const tilesetProps2 = map.addTilesetImage("TX Props", "tilesProps");
            const tilesetPlants2 = map.addTilesetImage("TX Plant", "tilesPlant");

            
            const layerGrass = map.createLayer("Grass",tilesetGrass,0,0);
            const layerWalls = map.createLayer("Walls",tilesetWalls,0,0);
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
            
            
            //layerWalls.setCollisionBetween(0,166);
            //layerWalls.setCollisionByProperty({ Collide: true });
            //layerWalls.setImmovable(true)
            //this.physics.add.collider(this.player, layerWalls);
            
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
            
    }
    update(){     

        this.player.updateStates();
        for(var i = 0; i < 10; i++){ this.enemy[i].updateEnemy(); }

        if(this.points == 4 && this.banner.visible == false){
            this.showEndGameMessage();
            this.canWin = true;
        }
    }
    attackDone(player,enemy){ //colision del ataque de la bruja vs enemigo
        if(player.frame.name == 0)  return;
        this.enemy[parseInt(enemy.name)].changeState(3);
    }
    enemyHits(player,enemy){ //colision del enemigo vs la bruja
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
        if(this.canWin){
            window.location.assign('../index.html');
        }
    }
    actualitzarVida(vidaActual, vidaMax){
        let crop = vidaActual/vidaMax * 160;
        this.HUDVida_actual.setCrop(0,0,crop,16);
    }
}

