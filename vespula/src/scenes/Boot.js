import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    }

    create ()
    {
        //  A global value to store the highscore in

        // this.scene.start('Preloader');
        this.add.text(0,0,'click to start the game and enable audio')
        this.input.once('pointerdown', () => {

            this.scene.start('Preloader');

        });
    }
}
