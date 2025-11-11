//second simulation prototype
//includes features and optimizations in the earlier prototype
//my attempt at better cleaner code including the use of a phaser sprite extension class for bees
import { Scene } from 'phaser';
import { bee, colony, pheromone, queen } from '../../utilities/classes';
import { minmax_randomInt } from '../../utilities/random';
import { distance } from '../../utilities/functions';
import { move, } from '../../utilities/movefuncs';
import { getDir } from '../../utilities/functions';
export class hive2 extends Scene {
    constructor() {
        super('hive2');
    }

    create() {
        const { centerX, centerY } = this.cameras.main;
        const { height, width } = this.scale;
        this.colonies = [];
        this.bees = [];
        this.pheremones = [];
        this.average_colony_hungers = {};
        this.fpsframes = 0;
        this.elapsed = 0;
        this.fps = this.add.text(0, height - 50, 'FPS: 0')
        //create queen bees
        var queen1 = new queen(this, 100, centerY, "worker", 20)
        var queen2 = new queen(this, width - 100, centerY, "worker", 20)

        //create colonies
        this.colony1 = new colony(1, queen1)
        this.colony2 = new colony(2, queen2)

        //randomly populate colonies
        this.colony1.randomly_populate(this, 0, 0, 20, 200)

        this.colony1.scatter(0, 1000)
        this.colony2.randomly_populate(this, 0, 0, 20, 20)
        this.colony2.scatter(0, 1000)
        this.colony1.enable_drag_and_drop()
        this.colony2.enable_drag_and_drop()
        this.colonies.push(this.colony1, this.colony2)
        //set timers to update average colony hunger
        var timer = this.time.addEvent({
            delay: 10000, // ms
            callback: () => {
                this.colony1.get_average_hunger();
                console.log(this.colony1.get_average_hunger())
            },
            loop: true,
        });
        var timer = this.time.addEvent({
            delay: 10000, // ms
            callback: () => {
                this.colony2.get_average_hunger();
                console.log(this.colony1.get_average_hunger())
            },
            loop: true,
        });


        //create debug sprites here
        var test_alarm = new pheromone(this, centerX, centerY, 1000, 'alarm')
        this.pheremones.push(test_alarm)
    }
    update(t, dt) {

        //fps counter
        this.elapsed += dt
        if (this.elapsed / 1000 > 1) {
            this.fps.text = `FPS: ${Math.trunc(this.fpsframes / (this.elapsed / 1000))}`

            this.fpsframes = 0
            this.elapsed = 0
        }
        this.fpsframes++
        //main game loop

        //pathfinding logic
        this.colonies.forEach(colony => {
            colony.bees.forEach(bee => {
                if (bee.gender == 'drone') {
                    //check for surrounding pheremones
                    if (bee.getNearbyPheremones(this.pheremones).length > 0) {
                        this.pheremones.forEach(pheremone => {
                            if (pheremone.type == 'alarm') {
                                bee.target = pheremone
                            }
                        })
                    }
                }
                //movement logic
                try {
                    var beeloc = bee.locAsObj();
                    bee.angle -= 1
                    var dir = getDir(beeloc, bee.target, bee.angle)
                    if (dir == 'straight') {
                        return;
                    }
                    if (dir == 'left') {
                        bee.angle -= 6
                    } else if (dir == 'right') {
                        bee.angle += 6
                    }
                }catch{
                    //move bee 5 steps forward
                    move(bee, bee.speed)

                }
            })
        })
    }
}
