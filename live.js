const LIVE=1;
const DEAD=0;

//初始化細胞
class Life{
    constructor(_row, _col){
        this.grid = [];
        this.row = _row;
        this.col = _col;
        for (let r = 0; r < this.row; r++) {
            this.grid.push(new Array()); //使grid變成二維陣列
            for (let c = 0; c < this.col; c++) {
                this.grid[r][c] = DEAD; //初始化每一細胞(預設為死亡)
                //this.grid[r].push(DEAD);
            }
            
        }
    }

    // calcNeighbor = function(row,col){

    // }
}
Life.prototype.statusAt = function(row, col){ //檢查細胞狀態
    if(row<0 || col<0 || row>=this.row || col>=this.col)
      return DEAD; //超出範圍回傳dead
    else
      return this.grid[row][col];//否則回傳細胞狀態
}
Life.prototype.calcNeighbor = function(row, col){ //計算該細胞鄰居的數量
    var count=0;
    count += this.statusAt(row-1, col-1)//lfet top
    count += this.statusAt(row-1, col+0)//up
    count += this.statusAt(row-1, col+1)//right top
    count += this.statusAt(row+0, col-1)//left
    count += this.statusAt(row+0, col+1)//right
    count += this.statusAt(row+1, col-1)//lfet bottom
    count += this.statusAt(row+1, col+0)//down
    count += this.statusAt(row+1, col+1)//right bottom
    return count;
}
Life.prototype.update = function(){ //更新細胞狀態
    //copy of grid for next generation
    //var nextGrid=this.grid; //same memory
    //grid先轉成字串再轉成物件，複製到nextGrid
    var nextGrid = JSON.parse(JSON.stringify(this.grid)); //parse:解析JSON字串並轉成js物件
    // var kid= {age:5, hight:170}
    // var kid1 = kid
    var count=0;
    for (let row = 0; row < this.row; row++) {
        for (let col = 0; col < this.col; col++) {
          count = this.calcNeighbor(row, col); //get鄰居數量
          //update LIVE=>DEAD
          if(this.statusAt(row,col) == LIVE && (count<2 || count>3)){
            nextGrid[row][col] = DEAD;
          }
          //update DEAD=> LIVE 
          if(this.statusAt(row,col) == DEAD && count==3){
            nextGrid[row][col] = LIVE;
          }
        }
    }

    //update this.grid
    this.grid = nextGrid;
    //gc() //garbage collection
}


//draw
class DrawGame{
  constructor(_game, _canvas){
      this.game = _game;
      this.canvas = document.getElementById(_canvas).getContext("2d");
      var size1 = document.getElementById(_canvas).width/this.game.col;
      var size2 = document.getElementById(_canvas).height/this.game.row;
      this.size = Math.min(size1,size2);
      this.canvas.lineWidth = 1;
      this.canvas.lineStyle = "#000";
  }
}

DrawGame.prototype.draw= function(){
  for (let row = 0; row < this.game.row; row++) {
      for (let col = 0; col < this.game.col; col++) {
         if(this.game.grid[row][col]==LIVE){
             this.canvas.fillStyle = "#f00";
         }else{
              this.canvas.fillStyle = "#fff";
         }   
          this.canvas.fillRect(col*this.size, row*this.size, this.size, this.size);
          this.canvas.strokeRect(col*this.size, row*this.size, this.size, this.size);
      }
  }
}

var game1 = new Life(3,3); //3*3的遊戲大小
//初始化一些活躍細胞
game1.grid[1][0]=LIVE;
game1.grid[1][1]=LIVE;
game1.grid[1][2]=LIVE;
//測試計算鄰居數量的函數
console.log("(1,1):"+game1.calcNeighbor(1,1));
console.log("(2,0):"+game1.calcNeighbor(2,0));

var drawgame1 = new DrawGame(game1, "board");
drawgame1.draw();

function next(){
    game1.update();
    //draw
    drawgame1.draw();
}

// console.log(game1.grid)

//var game2 = new Life(30,30);

function boardClick(event){
    var row = Math.floor(event.offsetY/drawgame1.size);
    var col = Math.floor(event.offsetX/drawgame1.size);
    if(drawgame1.game.grid[row][col]==LIVE)
        drawgame1.game.grid[row][col]=DEAD;
    else
        drawgame1.game.grid[row][col]=LIVE;
    drawgame1.draw();
}

