import { Scene } from 'phaser';

export class template extends Scene
{
    constructor ()
    {
        super('template');
    }

    create ()
    {
        this.add.text(0,0,'this is a template for all future scenes')
    }
}
