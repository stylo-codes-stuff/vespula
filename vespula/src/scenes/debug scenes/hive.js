//simulation for the interaction between two hives
// both hives start with 5 males and 5 females
// both queens have an equal likelyhood of producing both genders
//queens start with 20 eggs
import {
    minmax_randomInt,
    distance,
    getDir
} from '../../utilities/functions.js';
import {
    loc,
    move,
    isNear
} from '../../utilities/movefuncs.js'
import {
    pheremone
} from '../../utilities/classes.js';
export class hive extends Phaser.Scene {
    constructor() {
        super('hive');
    }
    create() {
        var beecount = 20
        this.graphics = this.add.graphics();
        this.labels = false;
        this.pause = true;
        this.bees = [];
        this.nectar = [];
        this.honey = [];
        this.flowers = [];
        this.pheremones = [];
        this.labelswitch = this.add.text(30, 30, 'Click to enable and disable labels').setInteractive();
        this.pause_button = this.add.text(30, 50, 'Click to pause the simulation').setInteractive();
        this.fpsframes = 0
        this.elapsed = 0
        this.frames = 0
        this.frameCounter = this.add.text(30, 70, 'Frames: 0')
        this.fps = this.add.text(160,70,`FPS: 0`)
        const {
            centerX,
            centerY
        } = this.cameras.main;
        const {
            height,
            width
        } = this.scale;
        //create and set properties for the first queen
        this.queen1 = this.add.sprite(100, centerY, 'drone').play('ground')
        this.queen1.eggs = 20;
        this.queen1.colony = '1';
        this.queen1.gender = 'queen'
        this.queen1.honey_eaten = 0
        this.queen1.honey_req = 5
        //do the same for the second
        this.queen2 = this.add.sprite(width - 100, centerY, 'drone').play('ground')
        this.queen2.angle = 180;
        //use crown sprites to diffrentiate since i havent made a queen sprite yet
        this.crown1 = this.add.sprite(centerX, centerY, 'crown').setDisplaySize(20, 20)
        this.crown2 = this.add.sprite(centerX, centerY, 'crown').setDisplaySize(20, 20)

        //create flowers
        for (var i = 0; i < 20; i++) {
            var randx = minmax_randomInt(200, width - 200)
            var randy = minmax_randomInt(200, height - 200)
            var flower = this.add.sprite(randx, randy, 'flower')
            flower.nectar_content = minmax_randomInt(0, 20);
            this.flowers.push(flower)
        }
        //create drones for colony #1
        for (var i = 0; i < beecount; i++) {
            var offsetx = minmax_randomInt(-50, 50)
            var offsety = minmax_randomInt(-50, 50)
            var bee = this.add.sprite(this.queen1.x + offsetx, this.queen1.y + offsety, 'drone')
            bee.target = null;
            bee.flowersVisited = [];
            bee.nectar = 0
            bee.full = false;
            bee.flee_distance = 30
            bee.gender = 'drone'
            bee.nectar_limit = 10
            bee.suck_time = 2000
            bee.speed = 5
            bee.colony = 1
            bee.flee = false
            this.bees.push(bee)

        }
        //create female workers for colony #1
        for (var i = 0; i < beecount; i++) {
            var offsety = minmax_randomInt(-50, 50)
            var bee = this.add.sprite(this.queen1.x + offsetx, this.queen1.y + offsety, 'drone')
            bee.target = null;
            bee.full = false;
            bee.nectar = 0
            bee.flee_distance = 30
            bee.gender = 'female'
            bee.nectar_limit = 10
            bee.suck_time = 2000
            bee.colony = 1
            bee.flee = false
            bee.speed = 5
            this.bees.push(bee)

        }
        //create drones for colony #2
        for (var i = 0; i < beecount; i++) {
            var offsetx = minmax_randomInt(-50, 50)
            var offsety = minmax_randomInt(-50, 50)
            var bee = this.add.sprite(this.queen2.x + offsetx, this.queen2.y + offsety, 'drone')
            bee.angle = 180
            bee.target = null;
            bee.flowersVisited = [];
            bee.full = false;
            bee.nectar = 0
            bee.gender = 'drone'
            bee.framesToWait = 0;
            bee.nectar_limit = 10
            bee.colony = 2
            bee.speed = 5
            bee.suck_time = 2000;
            bee.flee = false
            this.bees.push(bee)
        }
        //create female workers for colony #2
        for (var i = 0; i < beecount; i++) {
            var offsetx = minmax_randomInt(-50, 50)
            var offsety = minmax_randomInt(-50, 50)
            var bee = this.add.sprite(this.queen2.x + offsetx, this.queen2.y + offsety, 'drone')
            bee.angle = 180
            bee.target = null;
            bee.nectar = 0
            bee.full = false;
            bee.gender = 'female'
            bee.nectar_limit = 10
            bee.colony = 2
            bee.speed = 5
            //amount of frames spent drinking nectar
            bee.suck_time = 2000;
            bee.flee = false
            this.bees.push(bee)
        }
        this.labelswitch.on('pointerup', () => {
            this.labels = !this.labels
            //get and destroy all text objects so they can be updated except ones used in debugging
            let allTextObjects = this.children.list.filter(gameObject => gameObject instanceof Phaser.GameObjects.Text && gameObject != this.labelswitch && gameObject != this.pause_button && gameObject != this.frameCounter && gameObject != this.fps);

            allTextObjects.forEach(textObject => {
                textObject.destroy();
            });
        });
        this.pause_button.on('pointerup', () => {
            this.pause = !this.pause
        })
    }

    update(t,dt) {

        this.elapsed += dt
        if(this.elapsed/1000 > 1){
            this.fps.text = `FPS: ${Math.trunc(this.fpsframes/(this.elapsed/1000))}`

            this.fpsframes = 0
            this.elapsed = 0
        }
        //move queen markers to where the queens are
        this.crown1.x = this.queen1.x
        this.crown1.y = this.queen1.y - 30

        this.crown2.x = this.queen2.x
        this.crown2.y = this.queen2.y - 30

        //update frameCounter 
        this.frameCounter.text = `Frames: ${this.frames}`

        //check if labels are enabled
        if (this.labels == true) {
            //get and destroy all text objects so they can be updated except the label switch
            let allTextObjects = this.children.list.filter(gameObject => gameObject instanceof Phaser.GameObjects.Text && gameObject != this.labelswitch && gameObject != this.pause_button && gameObject != this.frameCounter && gameObject != this.fps);

            allTextObjects.forEach(textObject => {
                textObject.destroy();
            });
            //update labels for flowers
            this.flowers.forEach(flower => {
                var flowerloc = loc(flower)
                this.add.text(flowerloc.x, flowerloc.y - 30, `Nectar: ${flower.nectar_content}`, {
                    align: 'center'
                }).setOrigin()
            })
            //update labels for bees
            this.bees.forEach(bee => {
                var beeloc = loc(bee)
                if (bee.gender == 'drone') {
                    this.add.text(beeloc.x, beeloc.y - 30, `Nectar: ${bee.nectar}`, {
                        align: 'center'
                    }).setOrigin()
                }
            })
            this.nectar.forEach(nectar => {
                this.add.text(nectar.x, nectar.y, String(nectar.amount)).setOrigin(.5, .5)
            })
        }
        //determine movement for each bee respective to their type
        if (this.pause == false) {
            this.frames += 1
            //get target for each bee wether its a flower or the hive
            for (let index in this.bees) {
                var bee = this.bees[index];
                //pathfinding behavior for drones
                //NOTE: if a 
                //  doesnt have a target it will raise an error pointing at the loc function
                if (bee.gender == 'drone') {
                    if (bee.framesToWait > 0) {
                        bee.framesToWait -= 1
                        continue;
                    } else {
                        //find a new flower to visit
                        bee.speed = 5

                        //do nothing if a bee is extracting nectar except decrementing the frame counter

                        if (bee.flee == false || bee.full != true) {
                            var closest_dist = null
                            var closest_flower = null
                            for (let flower in this.flowers) {
                                if (this.flowers[flower].nectar_content > 0) {
                                    //check if it has been visited or if its out of nectar
                                    if (!bee.flowersVisited.includes(this.flowers[flower]) || this.flowers[flower].nectar_content <= 0) {
                                        var dist = distance(bee, this.flowers[flower])
                                        if (closest_dist > dist || closest_dist == null) {
                                            closest_flower = this.flowers[flower]
                                            closest_dist = dist
                                        }

                                    }
                                    bee.target = closest_flower;
                                }
                            }
                        }
                    }

                    // go back to the hive if you have too much nectar or there are no flowers with nectar
                    if (bee.nectar >= bee.nectar_limit || bee.target == null) {
                        if (bee.colony == 1) {
                            bee.target = this.queen1;
                        } else {
                            bee.target = this.queen2;
                        }
                        bee.full = true;
                    }
                    if (isNear(bee, bee.target, 30)) {
                        if (bee.target.texture.key == 'flower' && bee.target.nectar_content > 0) {
                            //keep bees from running out of flowers to revisit
                            if (bee.flowersVisited.length >= 5) {
                                bee.flowersVisited.pop()
                            }
                            bee.framesToWait = 1
                            bee.nectar += 1
                            bee.target.nectar_content -= 1;
                            bee.flowersVisited.push(bee.target)
                            bee.speed = 0
                        }
                        if (bee.target.texture.key == 'nectar') {
                            //turn it into honey
                        }
                        if (bee.target == this.queen1 || bee.target == this.queen2) {
                            if (bee.full == true) {
                                //simulate bees dropping off nectar
                                bee.framesToWait = 1
                                bee.speed = 0
                                var nectar = this.add.sprite(bee.x, bee.y, 'nectar')
                                nectar.amount = bee.nectar
                                nectar.ownedBy = bee.colony
                                bee.nectar = 0;

                                this.nectar.push(nectar)
                                bee.full = false;
                            }
                        }
                    }
                }
                //pathfinding behavior for females
                //for now they just swarm around the queen if they run out of nectar to convert
                if (bee.gender == 'female') {
                                        //if there is nectar that belongs to the colony find it and turn it into honey
                                        
                    if (this.nectar.length > 0) {
                        //filter nectar that doesn't belong to the workers colony
                        var owned = this.nectar.filter((drop) => drop.ownedBy == bee.colony)
                        //if the colony owns nectar go and turn it into honey
                        if (owned.length != 0) {
                            //get the nearest honey object
                            
                            bee.target = owned[0]
                        }
                    }
                    if(this.nectar.length == 0){
                        if (bee.colony == 1) {
                            bee.target = this.queen1;
                        }
                        if (bee.colony == 2) {
                            bee.target = this.queen2
                        }
                    }
                    //behaviors to perform when near specific targets
                    if(isNear(bee,bee.target,100)){
                        
                        if(bee.target.texture.key == 'nectar'){
                            var honey = this.add.sprite(bee.target.x,bee.target.y,'honey')
                            honey.ownedBy = bee.colony
                            honey.amount = bee.target.amount;
                            this.honey.push(honey)
                            console.log(this.nectar.indexOf(bee.target))
                            this.nectar = this.nectar.filter((drop) => drop != bee.target) // 2nd parameter means remove one item only
                            bee.target.destroy()
                        }
                    }
                }
                
            }
            //move bee toward target
            this.bees.forEach(bee => {
                var beeloc = loc(bee)
                bee.angle -= 1
                var dir = getDir(beeloc, bee.target, bee.angle)
                if(dir == 'straight'){
                    return;
                }
                if (dir == 'left') {
                    bee.angle -= 3
                } else if (dir == 'right') {
                    bee.angle += 3
                }
                //move bee 5 steps forward
                move(bee, bee.speed)


            });
            //randomly replenish nectar in certain flowers
            for (let flower in this.flowers) {
                flower = this.flowers[flower]
                var roll = minmax_randomInt(0, 1000)
                if (roll > 995) {
                    flower.nectar_content += 1
                } else {
                    continue
                }

            }
        }


        this.fpsframes++
    }
}