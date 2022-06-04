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
        this.load.image('tiles','../sprites/tilesets/Pixel Art Top Down - Basic/Texture/TX Tileset Grass.png')
        this.load.tilemapTiledJSON('map',"../Map/proveMap.tmj");
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
            const tileset = map.addTilesetImage("TX Tileset Grass", "tiles");
            const layer = map.createLayer("prove",tileset,0,0);
            layer.setScale(3);
            layer.resizeWorld();

            cursos = game.input.keyboard.createCursorKeys();

            game.input.onDown.add(resize, this);

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
    resize() {

        if(layer.displayWidth !== undefined)
        {
            var w = layer.displayWidth + 100;
            var h = layer.displayHeight + 100;
            layer.resize(w,h); 
        }
        else
        {
            if(layer.width < 800)
            {
                var w = layer.width + 100;
                var h = layer.height + 100;
                layer.resize(w,h);
            }
        }
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

