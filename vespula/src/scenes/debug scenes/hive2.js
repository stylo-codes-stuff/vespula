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
        this.pheromones = [];
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
        this.colony1.randomly_populate(this, 0, 0, 20, 20)

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


        //debugging for pheromones
        var test_alarm = new pheromone(this, centerX, centerY, 1000, 'alarm')
        this.pheromones.push(test_alarm)

    }
    update(t, dt) {

        //pheromone cleanup loop that deletes any destroyed pheromone markers from the tracking list
        //this is due to destroy not deleting ALL instances
        this.pheromones= this.pheromones.filter(sprite => {
            if (sprite.active) { // Check if the sprite is still active (not destroyed)
                return true;
            } else {
                // If not active, it's likely destroyed, so remove it from the list
                return false;
            }
        });
        //fps counter
        this.elapsed += dt
        if (this.elapsed / 1000 > 1) {
            this.fps.text = `FPS: ${Math.trunc(this.fpsframes / (this.elapsed / 1000))}`

            this.fpsframes = 0
            this.elapsed = 0
        }
        this.fpsframes++
        
        //main game loop
        this.pheromones.forEach(pheromone => {

        })

        //pathfinding logic
        this.colonies.forEach(colony => {
            colony.bees.forEach(bee => {
                //create a list with all pheromones close to the bee
                var nearby_pheremones = bee.getNearbyPheremones(this.pheromones)
                if (bee.gender == 'worker') {
                    if (nearby_pheremones.length > 0) {
                        nearby_pheremones.forEach(pheremone => {

                            if (pheremone.type == 'alarm') {
                                bee.target = pheremone
                                return;
                            }
                        })
                    }
                }
                if (bee.gender == 'drone') {
                    //check for surrounding pheromones
                    if (bee.getNearbyPheremones(this.pheromones).length > 0) {
                        this.pheromones.forEach(pheremone => {
                            if (pheremone.type == 'alarm') {
                                bee.target = pheremone
                                return;
                            }
                        })
                    }
                }
                //movement logic
                try {
                    console.log(bee.target)
                    var beeloc = bee.locAsObj();
                    var dir = getDir(beeloc, bee.target, bee.angle)
                    if (dir == 'straight') {
                        return;
                    }
                    if (dir == 'left') {
                        bee.angle -= bee.turn_angle;
                    } else if (dir == 'right') {
                        bee.angle += bee.turn_angle
                    }
                    move(bee, bee.speed)
                    bee.target = null
                } catch {
                    //move bee 5 steps forward
                    move(bee, bee.speed)
                    bee.angle += minmax_randomInt(-10, 10)
                    bee.target = null
                }
            })
        })
    }
}
