import { toRadians, countSharedElements } from "./functions";
import { random_choice } from "./random";
//in development non implemented classes
export class honeycomb extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y, radius,r,q) {
        super(scene, x, y); // Call the parent constructor
        
        this.x = x;
        this.y = y;
        this.scene = scene;
        //get the points of the hexagon using trig
        this.points = [
            [Math.round(this.x + (radius * Math.cos(toRadians(0)))), Math.round(this.y + (radius * Math.sin(toRadians(0))))],
            [Math.round(this.x + (radius * Math.cos(toRadians(60)))), Math.round(this.y + (radius * Math.sin(toRadians(60))))],
            [Math.round(this.x + (radius * Math.cos(toRadians(120)))), Math.round(this.y + (radius * Math.sin(toRadians(120))))],
            [Math.round(this.x + (radius * Math.cos(toRadians(180)))), Math.round(this.y + (radius * Math.sin(toRadians(180))))],
            [Math.round(this.x + (radius * Math.cos(toRadians(240)))), Math.round(this.y + (radius * Math.sin(toRadians(240))))],
            [Math.round(this.x + (radius * Math.cos(toRadians(300)))), Math.round(this.y + (radius * Math.sin(toRadians(300))))],
        ];
        
        this.edges = [
            [this.points[0], this.points[1]],
            [this.points[1], this.points[2]],
            [this.points[2], this.points[3]],
            [this.points[3], this.points[4]],
            [this.points[4], this.points[5]],
            [this.points[5], this.points[0]]
        ]
        // Initialize any custom properties or drawing here
        this.draw_empty()
        //add event listeners
    }
    getOffsets(){
        
    }
        draw_empty() {
            this.lineStyle(5, 0xEEC33D, 1.0);
            //
            this.fillStyle(0xc99504, 1.0);
            this.beginPath();
            
            this.points.forEach(point => {
                this.lineTo(point[0], point[1]);
            })
            this.closePath();
            this.fillPath()
            this.strokePath();
        }
        draw_empty() {
            this.lineStyle(7, 0xEEC33D, 1.0);
            //
            this.fillStyle(0xc99504, 1.0);
            this.beginPath();
            
            this.points.forEach(point => {
                this.lineTo(point[0], point[1]);
            })
            this.closePath();
            this.fillPath()
            this.strokePath();
        }
        draw_full() {
            
        }
    }
    
    export class hive {
        //creates
        constructor(scene, x, y) {
            this.cells = []
            this.scene = scene;
            //create the center cell
            var centercell = new honeycomb(scene, x, y, 25);
            var c2 = new honeycomb(scene, centercell.x,centercell.y-(25 * Math.sqrt(3) / 2), 25)
            var c3 = new honeycomb(scene, centercell.x, centercell.y +(25 * Math.sqrt(3) / 2), 25)
            scene.add.existing(centercell)
            scene.add.existing(c2)
            scene.add.existing(c3)
            this.cells.push(centercell);
            this.cells.push(c2, c3)
        }
        expand() {
            var outercells = []
            this.cells.forEach(cell1=>{
                this.cells.forEach(cell2=>{
                    console.log(countSharedElements(cell1.edges,cell2.edges))
                })
            })
        }
    }

export class dummywasp extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){
        super()
    }
    
}