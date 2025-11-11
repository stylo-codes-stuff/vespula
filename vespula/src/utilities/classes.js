import { distance } from "./functions"
import { minmax_randomInt } from "./random"



//class for pheremone data
export class pheromone extends Phaser.GameObjects.Sprite {


    constructor(scene, x, y, time, type, visible = true) {

        // Call the parent constructor
        super(scene, x, y, 'pmarker');
        //define custom props
        this.x = x
        this.y = y
        //the amount of frames this pheromone stays active
        this.time = time
        //can be either avoided or targeted
        this.type = type
        this.scene.add.existing(this)
        setTimeout(()=>this.kill(),this.time)
    }
    locAsObj() {
        return { x: this.x, y: this.y }
    }
    //gnarly method name
    kill(){
        this.destroy()
    }

}

export class colony {
    constructor(colony_number, queen) {
        this.colony_number = 0
        this.bees = []
        this.average_hunger = null
        this.queen = queen


    }
    //enable the ability to drag and drop bees from the colony
    enable_drag_and_drop() {
        this.bees.forEach(bee => {
            bee.setInteractive({ draggable: true })
        })
    }
    get_average_hunger() {
        var hunger = 0
        this.bees.forEach(bee => {
            hunger += bee.hunger
        })
        this.average_hunger = hunger / this.bees.length
    }
    randomly_populate(scene, x, y, males, females) {
        for (var i = 0; i < males; i++) {
            this.bees.push(new bee(scene, x, y, 'drone', minmax_randomInt(10, 20), minmax_randomInt(10, 20), minmax_randomInt(5, 20), minmax_randomInt(1000, 5000), minmax_randomInt(5, 10), minmax_randomInt(5,10)))
        }
        for (var i = 0; i < females; i++) {
            this.bees.push(new bee(scene, x, y, 'worker', minmax_randomInt(10, 20), minmax_randomInt(10, 20), minmax_randomInt(5, 20), minmax_randomInt(1000, 5000), minmax_randomInt(5,10, ), minmax_randomInt(5, 10)))
        }
    }
    scatter(offsetmin, offsetmax) {
        this.bees.forEach((bee) => {
            bee.x += minmax_randomInt(offsetmin, offsetmax)
            bee.y += minmax_randomInt(offsetmin, offsetmax)
        })
    }
}
//fingers crossed this class extension won't cause any weird and wacky edge cases!
//so far so good!!!
export class bee extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, gender, smell_distance, sight_distance, nectar_limit, suck_time, speed, turn_angle) {

        // Call the parent constructor
        super(scene, x, y, gender);
        //add custom properties

        //predef props
        this.target = null;
        this.flowersVisited = [];
        this.full = false;
        this.flee = false;
        this.nectar = 0;
        //max is 100 hunger
        this.hunger = 100
        //custom props  
        this.gender = gender;
        this.smell_distance = smell_distance
        this.sight_distance = sight_distance;
        this.nectar_limit = nectar_limit;
        this.suck_time = suck_time;
        this.speed = speed
        this.turn_angle = turn_angle
        //add event listeners
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject === this) { // Ensure it's this specific instance being dragged
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        });

        // Add the sprite to the scene's display and update lists
        scene.add.existing(this);

    }

    locAsObj() {
        return { x: this.x, y: this.y }
    }
    getNearbyPheremones(pheremeone_list) {
        var nearby_pheremones = [];
        pheremeone_list.forEach((pheremone) => {
            if (distance(this.locAsObj(), pheremone.locAsObj()) >= this.smell_distance) {
                nearby_pheremones.push(pheremone);
            }

        });
        return nearby_pheremones
    }
}
export class queen extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, colony, repro_req) {

        super(scene, x, y, texture)

        this.hygeine = 0;
        this.entourage = [];
        this.repro_req = repro_req;

    }
}
export class flower extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture) { }
}