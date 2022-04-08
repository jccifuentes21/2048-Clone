//Variables for the css grid 
const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;


export default class Grid{
  //Defining the private variable, can only be accessed inside the Grid class
  #cells

  constructor(gridElement){
    //Set the CSS properties using the variables inside of the JS 
    gridElement.style.setProperty('--grid-size', GRID_SIZE);
    gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
    gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);

    //createCellElements returns an array of all the cells in the grid. We take this array, and use the map function to create a Cell object for each existing DOM cell, and give this object 3 attribute: cellElement, x and y. The second argument of the map function acceses the index of the iteration. The final result is an array called #cells with Cell objects.
    
    this.#cells = createCellElements(gridElement).map((cellElement, index) => {
      return new Cell(
        cellElement, 
        index % GRID_SIZE, 
        Math.floor(index / GRID_SIZE)
      )
    })

  }

  get cells(){
     return this.#cells;
  }

  //Take normal cells and return a new array that organizes the cells by columns. This getter uses the reduce function which reduces an array. I also created a getter inside the cell class in order to get the x and y values of the cell for this getter.
  get cellsByColumn(){
    return this.#cells.reduce((cellGrid, cell) => {
      //if there's no array for this row, add an array
      cellGrid[cell.x] = cellGrid[cell.x] || []

      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, [])
  }
  
  get cellsByRow(){
    return this.#cells.reduce((cellGrid, cell) => {
      //if there's no array for this row, add an array
      cellGrid[cell.y] = cellGrid[cell.y] || []

      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, [])
  }

  //Returns all the cells that don't have tiles in them -- it's a simple getter
  get #emptyCells(){
    return this.#cells.filter(cell => cell.tile == null);
  }

  //Return a value between 0 and the number of empty cells
  randomEmptyCell(){
    const randomIndex = Math.floor(Math.random () * this.#emptyCells.length)

    return this.#emptyCells[randomIndex];
  }
}


//Object cell with x and y attributes.
class Cell{
  //Private variables only accessible thru the Cell class
  #cellElement
  #x
  #y
  #tile
  #mergeTile

  constructor(cellElement, x, y){
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get x(){
    return this.#x;
  }

  get y(){
    return this.#y;
  }

  get tile(){
    return this.#tile;
  }

  set tile(value){
    this.#tile = value;
    if(value == null) return
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;

  }

  get mergeTile(){
    return this.#mergeTile
  }

  set mergeTile(value){
    this.#mergeTile = value;
    if (value == null) return
    this.#mergeTile.x = this.#x;
    this.#mergeTile.y = this.#y;
  }

  canAccept = (tile) =>{
    return (
      this.tile == null || 
      (this.mergeTile == null && this.tile.value === tile.value)
    )
  }

  mergeTiles = () =>{
    if (this.tile == null ||  this.mergeTile == null) return
    this.tile.value = this.tile.value + this.mergeTile.value
    this.mergeTile.remove(); //This removes the tile from the DOM
    this.mergeTile = null;
  }

}

//Create tthe cells, put them in the DOM and return them array with the cells.
function createCellElements(gridElement){
  //Create a empty array
  const cells = [];

  //For loop to thru for each cell we want to create
  for(let i = 0; i < GRID_SIZE * GRID_SIZE; i++){

    //Create an individual cell
    const cell = document.createElement('div');

    //Give the cell the class of 'cell'
    cell.classList.add('cell');
    //Adding the 'cell' to the empty array of cells
    cells.push(cell);
    //Append the cell to the grid itself 
    gridElement.append(cell);
  }
  //Return the cells we created
  return cells;
}