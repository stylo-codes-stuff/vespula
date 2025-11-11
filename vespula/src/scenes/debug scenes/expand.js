//tests for how bees can expand the size of there hives and its associated behavior
import { Scene } from 'phaser';
import { honeycomb } from '../../utilities/debugclasses';
import { hive } from '../../utilities/debugclasses';
export class expand extends Scene
{
    constructor ()
    {
        super('expand');
    }
    
    create ()
    {
        const {centerX,centerY} = this.cameras.main;
        console.log(centerX,centerY)

        this.hive = new hive(this,100,100)
        this.expand_button = this.add.text(25,25,'Click to randomly expand the hive')
        this.hive.expand()
    }
}
