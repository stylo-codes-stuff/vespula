import { toRadians, distance } from './functions.js'

// utility functions for moving sprites 

//returns a sprites coords in an object for code reduction and readability
export function loc(sprite) {
    return { x: sprite.x, y: sprite.y }
}
export function locobj(px, py) {
    return { x: py, y: py }

}
//turns sprite a specified number of degrees
export function turn(sprite, degrees) {
    sprite.angle = sprite.angle + degrees
}

//moves a sprite forward an amount of steps/pixels 
export function move(sprite, steps) {
    sprite.setPosition(sprite.x + Math.cos(toRadians(sprite.angle)) * steps, sprite.y + Math.sin(toRadians(sprite.angle)) * steps)
}

export function isNear(sprite, target, threshold) {

    if (distance(sprite, target) <= threshold) {
        return true;
    } else {
        return false;
    }
}
export function get_closest(target_texture_key) {
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


