export default class Tile{
  //Private variables
  #tileElement
  #x
  #y
  #value

  //the tile container is the grid, and the value is a number with 50% chance to be either 2 or 4
  constructor(tileContainer, value = Math.random() > .5 ? 2 : 4){
    //Create the tile, add the class 'tile' and append it to the grid.
    this.#tileElement = document.createElement('div');
    this.#tileElement.classList.add('tile');
    tileContainer.append(this.#tileElement);
    this.value = value;

  }

  get value(){
    return this.#value
  }

  //Math to set the color of the tile depending on the number 
  set value(v){

    this.#value = v;
    this.#tileElement.textContent = v;
    const power = Math.log2(v);
    const backgroundLightness = 100 - power * 9;

    //setting the css background lightness property
    this.#tileElement.style.setProperty(
      '--background-lightness', 
      `${backgroundLightness}%`)

    //setting the css text color property
    this.#tileElement.style.setProperty(
      '--text-lightness', 
      `${backgroundLightness <= 50 ? 90:10}%`)
  }

  //set the x value of the tile in the js ans css
  set x(value){
    this.#x = value;
    this.#tileElement.style.setProperty('--x', value)

  }

  //set the y value of the tile in the js ans css
  set y(value){
    this.#y = value;
    this.#tileElement.style.setProperty('--y', value)

  }
  remove(){
    this.#tileElement.remove();
  }

  waitForTransition(animation = false){
    return new Promise(resolve => {
      this.#tileElement.addEventListener(animation ? "animationend" : "transitionend", resolve, {once:true})
    })
  }
}