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
// CREATE

// num = 1;
// gameIsPaused = false;

// bg = this.add.tileSprite;
// pauseBtn = this.add.sprite(600,25,'pauseBtn').setOrigin(0);
// pauseBtn.setInteractive();
// resumeBtn = this.add.sprite(600,25,'resumeBtn').setOrigin(0);
// resumeBtn.setInteractive();
// resumeBtn.depth = 2;
// 
// pauseBg = this.add.sprite(600,25,'pauseBg').setOrigin(0);
// pauseBg.alpha = 0.5;
// pauseOverlay = this.add.sprite(600,25,'pauseOverlay').setOrigin(0);

//list = [pauseBg,resumeBtn,pauseOverlay];
//list.forEach(l=>{
    //l.setVisble(false);
//    l.setActive(false);
// });

//pauseBtn.on('pointerdown', function(){
//     if(gameIsPaused === false)
//     {
            // gameIsPaused = true;
            // pauseBtn.setVisible(false);
            // pauseBtn.Active(false);
            //list.forEach(l=>{
                // l.setVisble(true);
            //     l.setActive(true);
        // });
//     }
// })

//resumeBtn.on('pointerdown', function(){
//     if(gameIsPaused === false)
//     {
            // gameIsPaused = false;
            // pauseBtn.setVisible(true);
            // pauseBtn.Active(true);
            //list.forEach(l=>{
                // l.setVisble(false);
            //     l.setActive(false);
        // });
//     }
// })


//UPDATE

// num +=1;
//console.log('puta');

//if(gameIsPause === false)
// {
//     BigInt.tilePosition += 2
// }
