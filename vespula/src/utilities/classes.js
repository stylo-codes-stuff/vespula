import { distance } from "./functions"
import { minmax_randomInt } from "./random"



var flower_keys = []
//class for pheremone data
export class pheremone{
    
    
    constructor(x,y,time,type){
        this.x = x
        this.y = y
        //the amount of frames this pheremone stays active
        this.time = time
        //can be either avoided or targeted
        this.type = type
    }
    locAsObj(){
        return {x:this.x,y:this.y}
    }
}

export class colony{
    constructor(colony_number,queen){
        this.colony_number = 0
        this.bees = []
        this.average_hunger = null
        this.queen = queen
        
        
    }
    //enable the ability to drag and drop bees from the colony
    enable_drag_and_drop(){
        this.bees.forEach(bee=>{
            bee.setInteractive({ draggable: true })
        })
    }
    get_average_hunger(){
        var hunger = 0
        this.bees.forEach(bee=>{
            hunger += bee.hunger
        })
        this.average_hunger =  hunger/this.bees.length
    }
    randomly_populate(scene,x,y,males,females){
        for(var i = 0; i <males;i++){
            this.bees.push(new bee(scene,x,y,'drone','drone',minmax_randomInt(10,20),minmax_randomInt(10,20),minmax_randomInt(5,20),minmax_randomInt(1000,5000),minmax_randomInt(5,20)))
        }
        for(var i = 0; i <females;i++){
            this.bees.push(new bee(scene,x,y,'drone','worker',minmax_randomInt(10,20),minmax_randomInt(10,20),minmax_randomInt(5,20),minmax_randomInt(1000,5000),minmax_randomInt(5,20)))
        }
    }
    scatter(offsetmin,offsetmax){
        this.bees.forEach((bee)=>{
            bee.x += minmax_randomInt(offsetmin,offsetmax)
            bee.y += minmax_randomInt(offsetmin,offsetmax)
        })
    }
}
//fingers crossed this class extension won't cause any weird and wacky edge cases!
export class bee extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture,gender,smell_distance,flee_distance,nectar_limit,suck_time,speed) {
        // Call the parent constructor
        super(scene, x, y, texture);
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
        this.flee_distance = flee_distance;
        this.nectar_limit = nectar_limit;
        this.suck_time = suck_time;
        this.speed = speed
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
    
    locAsObj(){
        return {x:this.x,y:this.y}
    }
    getNearbyPheremones(pheremeone_list){
        var nearby_pheremones = [];
        pheremeone_list.forEach((pheremone) => {
            if(distance(this.locAsObj(),pheremone.locAsObj())>= this.smell_distance){
                nearby_pheremones.push(pheremone);
            }   
            
        });
        return nearby_pheremones
    }
}
export class queen extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,colony,repro_req){
        
        super(scene,x,y,texture)
        
        this.hygeine = 0;
        this.entourage = [];
        this.repro_req = repro_req;
        
    }
}
export class flower extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y,texture){}
}