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
    var nextGrid = JSON.parse(JSON.stringify(this.grid));
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
      this.game = _game; //接收一個 Life 遊戲實例
      this.canvas = document.getElementById(_canvas).getContext("2d"); //取得Canvas元素
      //計算格子的大小，使得每一欄/列都可以完整顯示
      var size1 = document.getElementById(_canvas).width/this.game.col; 
      var size2 = document.getElementById(_canvas).height/this.game.row; 
      this.size = Math.min(size1,size2); // 取最小值，確保格子是正方形
      this.canvas.lineWidth = 1; //設定線的寬度
      this.canvas.lineStyle = "#000"; //設定線的顏色
  }
}

DrawGame.prototype.draw= function(){
    for (let row = 0; row < this.game.row; row++) {
        for (let col = 0; col < this.game.col; col++) {
           this.drawPoint(row,col); //呼叫drawPoint繪製每一個格子
        }
    }
}
DrawGame.prototype.drawPoint= function(row,col){
    if(this.game.grid[row][col]==LIVE){
        this.canvas.fillStyle = "#f00"; //if cell is live → red 
    }else{
        this.canvas.fillStyle = "#fff"; //if cell is dead → white
    }   
    this.canvas.fillRect(col*this.size, row*this.size, this.size, this.size); //繪製實心矩形
    this.canvas.strokeRect(col*this.size, row*this.size, this.size, this.size); //繪製矩形邊框
}


var game1 = new Life(3,3); //3*3的遊戲大小
//初始化一些活躍細胞
game1.grid[1][0]=LIVE;
game1.grid[1][1]=LIVE;
game1.grid[1][2]=LIVE;
//測試計算鄰居數量的函數
console.log("(1,1):"+game1.calcNeighbor(1,1));
console.log("(2,0):"+game1.calcNeighbor(2,0));

//建立畫布game1，開始畫格子
var drawgame1 = new DrawGame(game1, "board");
drawgame1.draw();

function next(){
    game1.update(); //更新遊戲狀態
    drawgame1.draw(); //更新後的狀態重新繪製在Canvas
}

function boardClick(event){
    //取得滑鼠點擊位置的行/欄
    var row = Math.floor(event.offsetY/drawgame1.size);
    var col = Math.floor(event.offsetX/drawgame1.size);
    //如果點擊位置是live，設為dead，反之
    if(drawgame1.game.grid[row][col]==LIVE)
        drawgame1.game.grid[row][col]=DEAD;
    else
        drawgame1.game.grid[row][col]=LIVE;
    drawgame1.drawPoint(row,col); //將更新後的點繪製在 Canvas 上
}

