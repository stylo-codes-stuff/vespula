import { Scene } from 'phaser';

export class orbit extends Scene
{
    constructor ()
    {
        super('orbit');
    }

    create ()
    {
        const textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8,align:"center"};

        this.add.text(0,0,'this is a template for all future scenes',textStyle)
    }
}
