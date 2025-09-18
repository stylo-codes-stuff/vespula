//test scene for how swarms hover around the group center
import {toRadians,getDir,minmax_randomInt} from '../../utilities/functions.js';
import {loc,move} from '../../utilities/movefuncs.js'
export class orbit extends Phaser.Scene {
    constructor() {
        super('orbit');
    }


    create() {
        this.bees = []
        const {centerX,centerY} = this.cameras.main;
        for (var i =0; i<100;i++){
           this.bees.push(this.add.sprite(400,400,'drone').setDisplaySize(32,32).play('flight')) 
        }
    }
    update(){
        var {centerX,centerY} = this.cameras.main;
        const pointer = this.input.activePointer;
        const cursorX = pointer.x; // X-coordinate of the pointer
        const cursorY = pointer.y; // Y-coordinate of the pointer
        this.bees.forEach(bee=>{
        var beeloc = loc(bee)
        var centerloc = {x:centerX+minmax_randomInt(-30,30),y:centerY+minmax_randomInt(-30,30)}
        bee.angle -=1
        var dir = getDir(beeloc,centerloc,bee.angle)
        if(dir == 'left'){
            bee.angle -= minmax_randomInt(-1,10)
        }
        else if (dir == 'right'){
            bee.angle += minmax_randomInt(-1,10)
        }
        //move bee 5 steps forward
        move(bee,5)
   
            
        });

        //x' = x + distance * cos(angle)
}
}