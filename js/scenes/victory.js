class victoryScene extends Phaser.Scene{

    constructor(){
        super('victoryScene');
        this.i = 0;
    }
    preload() {
        
    }
    create () {
        console.log("patata");
        var manCamera = this.cameras.main;
        manCamera.fadeIn(2000);

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.hsv = Phaser.Display.Color.HSVColorWheel();

        //  Rainbow Text font: https://phaser.io/examples/v3/view/display/tint/rainbow-text#
        this.text1 = this.add.text(screenCenterX, screenCenterY, 'VICTORY', { font: "74px arial black", fill: "#fff" }).setOrigin(0.5);
        this.text1.setShadow(2, 2, "#333333", 2, true, true);

    }

    update () {
        const top = this.hsv[this.i].color;
        const bottom = this.hsv[359 - this.i].color;

        this.text1.setTint(top, top, bottom, bottom);

        this.i++;

        if (this.i === 360)
        {
            this.i = 0;
        }
    }
    
}