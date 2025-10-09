import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {

    }

    create ()
    {
        //  A global value to store the highscore in

        // this.scene.start('Preloader');
        this.add.text(0,0,'click to start the game and enable audio')
        //this.input.once('pointerdown', () => {

            this.scene.start('Preloader');

       // });
    }
}
