//simulation for the interaction between two hives
// both hives start with 5 males and 5 females
// both queens have an equal likelyhood of producing both genders
//queens start with 20 eggs
import {minmax_randomInt,get_closest} from '../../utilities/functions.js';
import {loc} from '../../utilities/movefuncs.js'
import {pheremone} from '../../utilities/classes.js';
export class hive extends Phaser.Scene {
    constructor() {
        super('hive');
    }


    create() {
        this.graphics = this.add.graphics();
        this.labels = false;
        this.bees = [] ;

        //???
        //uninitalized but still functions normally?
        console.log(this.bees) // => undefined
        console.log(String(this.bees)) // => ''
        //???
        this.flowers = [];
        this.pheremones = [];
        this.labelswitch = this.add.text(30,30,'Click to enable and disable labels').setInteractive()
        const {centerX,centerY} = this.cameras.main;
        const {height,width} = this.scale;
        //create and set properties for the first queen
        this.queen1 = this.add.sprite(100,centerY,'drone').play('ground')
        this.queen1.eggs = 20;
        this.queen1.colony = '1';
        this.queen1.gender = 'queen'
        this.queen1.honey_eaten = 0
        this.queen1.honey_req = 5
        //do the same for the second
        this.queen2 = this.add.sprite(width-100,centerY,'drone').play('ground')
        this.queen2.angle = 180;
        //use crown sprites to diffrentiate since i havent made a queen sprite yet
        this.crown1 = this.add.sprite(centerX,centerY,'crown').setDisplaySize(20,20)
        this.crown2 = this.add.sprite(centerX,centerY,'crown').setDisplaySize(20,20)
        
        //create flowers
        for(var i = 0;i<10;i++){
            var randx = minmax_randomInt(200,width-200)
            var randy = minmax_randomInt(200,height-200)
            var flower = this.add.sprite(randx,randy,'flower')
            flower.nectar_content = minmax_randomInt(0,10);
            this.flowers.push(flower)
        }
        get_closest(this.queen1,this.flowers)
        //create drones for colony #1
        for(var i = 0;i<5;i++){
            var offsetx = minmax_randomInt(-50,50)
            var offsety = minmax_randomInt(-50,50)
            var bee = this.add.sprite(this.queen1.x+offsetx,this.queen1.y+offsety,'drone')
            bee.target = null;
            bee.nectar = 0
            bee.nectar_limit = 10
            bee.colony = 1
            this.bees.push(bee)
            
        }
        //create drones for colony #2
        for(var i = 0;i<5;i++){
            var offsetx = minmax_randomInt(-50,50)
            var offsety = minmax_randomInt(-50,50)
            var bee = this.add.sprite(this.queen2.x+offsetx,this.queen2.y+offsety,'drone')
            bee.angle = 180
            bee.target = null;
            bee.nectar = 0
            bee.nectar_limit = 10
            bee.colony = 2
            this.bees.push(bee)
        }
        this.labelswitch.on('pointerup',()=>{
            this.labels = !this.labels
            let allTextObjects = this.children.list.filter(gameObject => gameObject instanceof Phaser.GameObjects.Text && gameObject != this.labelswitch);

            allTextObjects.forEach(textObject => {
                textObject.destroy();
            });
        })
        
    }
        
    update(){
        //move queen markers to where the queens are
        this.crown1.x = this.queen1.x
        this.crown1.y = this.queen1.y -30
        
        this.crown2.x = this.queen2.x
        this.crown2.y = this.queen2.y -30
        //check if labels are enabled
        if(this.labels == true){
            //get and destroy all text objects so they can be updated except the label switch
            let allTextObjects = this.children.list.filter(gameObject => gameObject instanceof Phaser.GameObjects.Text && gameObject != this.labelswitch);

            allTextObjects.forEach(textObject => {
                textObject.destroy();
            });
            //update labels for flowers
            this.flowers.forEach(flower=>{
                var flowerloc = loc(flower)
                this.add.text(flowerloc.x,flowerloc.y-30, `Nectar: ${flower.nectar_content}`,{align:'center'}).setOrigin()
            })
            //update labels for bees
            this.bees.forEach(bee=>{
                var beeloc = loc(bee)
                this.add.text(beeloc.x,beeloc.y-30, `Nectar: ${bee.nectar}`,{align:'center'}).setOrigin()
            })
        }
        //determine movement for each bee respective to their type
        
        this.bees.forEach(bee=>{
            if (bee.target == null){
                bee.target = get_closest
            }
        })
        
    }
}