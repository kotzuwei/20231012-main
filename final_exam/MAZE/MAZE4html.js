var MAZE = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

class Point {
    constructor(_row, _col) {
        this.row = _row;
        this.col = _col;
    }
}

var Step = new Point(1, 1);
var Exit = new Point(8, 10);
var Stack = [];

function drawBoard() { //在 canvas 上畫迷宮ㄉ函數
    var canvas = document.getElementById("board").getContext("2d"); //從網頁取得ID為("board")ㄉ元素，2d繪圖
    for (let row = 0; row < MAZE.length; row++) { //MAZE.length:10
        for (let col = 0; col < MAZE[0].length; col++) { //MAZE[0].length:12 (row[0]ㄉlength
            if (MAZE[row][col] == 0) {
                canvas.fillStyle = "#ffffff"; //= 0:空的區域填白色
            }
            else if (MAZE[row][col] == 1) {
                canvas.fillStyle = "#000"; //= 1:牆壁填黑色
            } else if (MAZE[row][col] == 2) {
                canvas.fillStyle = "#C4E1FF"; //= 2:走過ㄉ路填淺藍色
            }
            canvas.fillRect(col * 50, row * 50, 50, 50); //畫一長方形，位置:col * 50, row * 50、寬高:50,50
        }
    }
}

var dir=[[-1,0],[0,-1],[1,0],[0,1]]
dir.sort((a,b)=>{
    return Math.random()-0.5;
    //亂數排序dir,使每次走ㄉ點都不一樣
    //e.g. dir=[[1,0],[0,-1],[-1,0],[0,1]]
    //=> Step.row + dir[3][1] = down
})
function go() {
    drawBoard();
    //Method 2
    while (Step.row != Exit.row || Step.col != Exit.col) {
        MAZE[Step.row][Step.col] = 2;
        drawPoint(Step.row, Step.col);
        //up
        if (MAZE[Step.row + dir[0][0]][Step.col+dir[0][1]] == 0) {
            Stack.push(new Point(Step.row, Step.col));
            Step.row = Step.row + dir[0][0]; //row + dir[0][0] (方向隨機
            Step.col = Step.col + dir[0][1];
        } else
            //left
            if (MAZE[Step.row+ dir[1][0]][Step.col +dir[1][1]] == 0) {
                Stack.push(new Point(Step.row, Step.col));
                Step.row = Step.row + dir[1][0];
                Step.col = Step.col + dir[1][1];
            } else
                //down
                if (MAZE[Step.row + dir[2][0]][Step.col+dir[2][1]] == 0) {
                    Stack.push(new Point(Step.row, Step.col));
                    Step.row = Step.row + dir[2][0];
                    Step.col = Step.col + dir[2][1];
                } else
                    //right
                    if (MAZE[Step.row+ dir[3][0]][Step.col +dir[3][1]] == 0) {
                        Stack.push(new Point(Step.row, Step.col));
                        Step.row = Step.row + dir[3][0];
                        Step.col = Step.col + dir[3][1];
                    } else {//trace back
                        if (Stack.length > 0) {
                            // var Prev = Stack.pop();
                            // Step.row = Prev.row;
                            // Step.col = Prev.col;
                            Step = Stack.pop();
                        } else {
                            break;
                        }
                    }
    }
    //To exit
    if (Stack.length > 0) {
        MAZE[Step.row][Step.col] = 2;
        drawPoint(Step.row, Step.col); //走過的最後一點也畫成淺藍色
        console.log("Done!");
    } else {
        console.log("No Solution!");
    }
}