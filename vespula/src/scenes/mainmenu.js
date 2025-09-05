import { Scene } from 'phaser';

export class mainmenu extends Scene
{
    constructor ()
    {
        super('mainmenu');
    }


    create ()
    {
        const textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8,align:"center"};
        const {centerX,centerY} = this.cameras.main;
        this.title = this.add.text(centerX,centerY-300,"VESPULA \n a bee based eusociality simulation",textStyle).setOrigin(.5,.5)
        this.start = this.add.text(centerX,centerY+100,'start',textStyle).setOrigin(.5,.5).setInteractive()
        this.debug = this.add.text(centerX,centerY,"Debug Menu",textStyle).setOrigin(.5,.5).setInteractive()



        this.debug.on('pointerup',()=>{




            this.scene.switch('debugmenu')
        })
    }
}
