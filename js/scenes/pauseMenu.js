Pause = new Phaser.Scene('Pause')

Pause.create = function(){
    resumeBtn = this.add.sprite(600,25,'resumeBtn').setOrigin(0)
    resumeBtn.setInteractive()
    resumeBtn.depth = 2

    pauseButton = this.addd.sprite(0,0,'woodSingBot').setOrigin(0)
    pauseButton.alpha = 0.5
    pauseOverlay = this.add.sprite(100,200,'woodSingTop.png').setOrigin(0)
    resumeBtn.on('pointerdown',function(){
        Pause.Scene.resume('GameScene')
        Pause.Scene.stop()
    })   
}



// /GameScene
// create

// num = 1
// gameIsPaused = false

// bg = this.add.tileSprite
// pauseBtn = this.add.sprite(600,25,'pauseBtn').setOrigin(0)
// pauseBtn.setInteractive()
// resumeBtn = this.add.sprite(600,25,'resumeBtn').setOrigin(0)
// resumeBtn.setInteractive()
// resumeBtn.depth = 2
// 
// pauseBg = this.add.sprite(600,25,'pauseBg').setOrigin(0)
// pauseOverlay = this.add.sprite(600,25,'pauseOverlay').setOrigin(0)


//Update
