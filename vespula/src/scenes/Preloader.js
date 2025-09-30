import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');

    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {        
        //preload images
        this.load.image('flower','assets/flower.png')
        this.load.image('bee2','assets/bee.png')
        this.load.image('crown','assets/crown.png')
        this.load.image('honey','assets/honey.png')
        this.load.image('nectar','assets/nectar.png')
        //preload and configure spritesheets
        this.load.spritesheet('drone', '../assets/spritesheets/drone.png', {
            frameWidth: 31, // Each frame is 64 pixels wide
            frameHeight: 31, // Each frame is 64 pixels high
            });



    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, we will define our 'coin' animation here, so we can use it in other scenes:

        const flight = {
            key: 'flight', // Unique key for the animation
            frames: this.anims.generateFrameNumbers('drone', {
                start: 0,
                end: 2,
            }),
            frameRate: 30, // 20 frames per second
            repeat: -1 // Loop indefinitely
        };
        const ground = {
            key: 'ground', // Unique key for the animation
            frames: this.anims.generateFrameNumbers('drone', {
                start: 2,
                end: 2,
            }),
            frameRate: 30, // 20 frames per second
            repeat: -1 // Loop indefinitely
        };
        this.anims.create(flight);
        this.anims.create(ground)
        this.scene.transition({
            target: 'hive',
            duration: 1000,
            moveBelow: true,
            onUpdate: (progress) => {
                this.cameras.main.setAlpha(1 - progress);
            }
        });

        //  When the transition completes, it will move automatically to the MainMenu scene
    }
}
