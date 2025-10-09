export function minmax_randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function random_choice(list){
    return list[minmax_randomInt(0,list.length-1)]
}
//randomly picks a specified amount of elements from a list
export function return_random_elements(list,amount){
    
}
export function weighted_choice(list){

}
//generates a random binary number of a specified length in the form of a string
export function generate_random_binary(length){
      var binary = ''
      for (var i = 0;i<length;i++){
        binary += String(minmax_randomInt(0,1))
      }

}