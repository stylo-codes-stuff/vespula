//second simulation prototype
//includes features and optimizations in the earlier prototype
//my attempt at better cleaner code including the use of a phaser sprite extension class for bees
import { Scene } from 'phaser';
import { bee } from '../../utilities/classes';
export class hive2 extends Scene
{
    constructor ()
    {
        super('hive2');
    }

    create ()
    {
        this.add.text(0,0,'this is a template for all future scenes')
        this.bee = new bee(this,100,100,'drone')
    }
}
