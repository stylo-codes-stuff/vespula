import { Scene } from 'phaser';

export class debugmenu extends Scene
{
    constructor ()
    {
        super('debugmenu');
    }

    create ()
    {
        const {centerX,centerY} = this.cameras.main;
       this.orbit =  this.add.text(centerX,centerY,'Swarm orbiting').setInteractive()

       this.orbit.on('pointerdown',()=>{
        this.scene.switch('orbit')
       })
    }
}
