


//class for pheremone data
export class pheremone{
    
    
    constructor(x,y,time,mode){
        this.x = x
        this.y = y
        //the amount of frames this pheremone stays active
        this.time = time
        //can be either avoid
        this.mode = mode
    }
}


//fingers crossed this class extension won't cause any weird and wacky edge cases!
export class bee extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, texture) {
    // Call the parent constructor
    super(scene, x, y, texture);

    // Add the sprite to the scene's display and update lists
    scene.add.existing(this);


    }
}