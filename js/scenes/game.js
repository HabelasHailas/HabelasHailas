"use strict";

class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
        // this.player = null;
        this.player = new Player(this);
        this.enemy = new Enemies(this);
        this.demon = [];
        this.points = 0;
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
        
        // this.load.spritesheet      
        this.player.preloadPlayer();  
        this.enemy.preloadEnemy();  

        for(var i = 0; i < 4; i++){
            this.demon[i] = new Demon(this,i);
            this.demon[i].preloadDemon();
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

        this.player.createPlayer();
        this.enemy.createEnemy(); 
        for(var i = 0; i < 4; i++){ this.demon[i].createDemon(); }
        
        //#region COLI
        this.physics.add.collider(this.player.attackProjectile, this.enemy); //enemigo vs atac
        this.physics.add.collider(this.player, this.enemy); //enemigo vs bruja
        for(var i = 0; i < 4; i++)  this.physics.add.collider(this.player, this.demon[i]); 
        
        this.physics.add.overlap(this.player.attackProjectile,this.enemy.enemy,(body1,body2)=>this.attackDone(body1,body2));
        this.physics.add.overlap(this.player.player,this.enemy.enemy,(player,enemy)=>this.enemyHits(player,enemy));
        for(var i = 0; i < 4; i++)  
            this.physics.add.overlap(this.player.player,this.demon[i].demon,(player,demon)=>this.enterDemon(player,demon));
        //#endregion
        
    }
    update(){      
        this.enemy.updateEnemy();
        this.player.updateStates();
    }
    attackDone(player,enemy){ //colision del ataque de la bruja vs enemigo
        if(player.frame.name == 0)  return;
        this.enemy.changeState(3);
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
    }
}

