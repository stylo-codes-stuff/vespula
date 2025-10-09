//utility functions
import {loc} from './movefuncs.js';

export function toRadians(degrees){

    return degrees * (Math.PI / 180)
    
}

//gets the distance between the provided coordinates
export function distance(p1,p2){
    var dist =  Math.sqrt(Math.pow(p2.x-p1.x,2)+ Math.pow(p2.y-p1.y,2))

    return dist
    
}

//takes a list of sprites and gets the one thats closest to the provided sprite
//FINISH THIS!!!!!
export function get_closest(sprite,sprites){
        var closest = sprite ;
        var closestdist = null
        var spriteloc = loc(sprite)
        for (let sprite in sprites){
            var spriteloc2 = loc(sprites[sprite])
            var dist = Math.trunc(distance(spriteloc,spriteloc2))
            if(dist<=closestdist || closestdist == null){
                closestdist = dist;
                closest = sprites[sprite]
            }
        }
        return closest;
}

//returns the what direction a vector needs to turn in order to face a target point
export function getDir(bee,target, currentHeadingDegrees) {
    // Calculate the manhattan distance between the two points
    const dx = target.x - bee.x;
    const dy = target.y - bee.y;

    //get the angle between the points in radians
    const angleRadians = Math.atan2(dy, dx);

    // radians conversion
    let angleDegrees = angleRadians * (180 / Math.PI);

    //360 normalization
    if (angleDegrees < 0) {
        angleDegrees += 360;
    }
    //get and normalize the difference between the two angles
    let turnDifference = angleDegrees - currentHeadingDegrees;

    
    if (turnDifference > 180) {
        turnDifference -= 360;
    } else if (turnDifference < -180) {
        turnDifference += 360;
    }

    // Determine the turn direction
    if (turnDifference > 0) {
        return "right";
    } else if (turnDifference < 0) {
        return "left";  
    } else {
        return "straight";
    }
}

//takes two strings or decimal ints that represent genetic information and performs crossover based on the type of inheritance
export function crossover(dna1,dna2,type=null){
    
    
}