import {toRadians,distance} from './functions.js'

// utility functions for moving sprites 

//returns a sprites coords in an object for code reduction and readability
export function loc(sprite){
    return {x:sprite.x,y:sprite.y}
}
export function locobj(px,py){
    return {x:py,y:py}

}
//turns sprite a specified number of degrees
export function turn(sprite,degrees){
    sprite.angle = sprite.angle + degrees
}

//moves a sprite forward an amount of steps/pixels 
export function move(sprite,steps){
    sprite.setPosition(sprite.x + Math.cos(toRadians(sprite.angle)) * steps,sprite.y+ Math.sin(toRadians(sprite.angle)) * steps)
}

export function isNear(sprite,target,threshold){
    
    if (distance(sprite,target) <= threshold){
        return true;
    }else{
        return false;
    }
}