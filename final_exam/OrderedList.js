class OrderedList {
    constructor() {
        this.data = []
    }
}
OrderedList.prototype.insert = function (item) {
    //索引值從0開始so data.length-1
    var start=0, end=this.data.length-1, mid, pos
    while(start<=end){
        mid = Math.floor((start+end)/2);
        //if→找到相同元素，跳出迴圈。else→調整start,end。
        if(item == this.data[mid]){
            break;
        }else if(item < this.data[mid]){
            end = mid-1;
        }else{
            start = mid+1;
        }
    }
    // if(start > end)
    //   pos = start;
    // else
    //  pos = mid;

    //if s>e → pos = start ,else pos = mid
    pos = (start > end) ? start : mid;
    this.data.splice(pos,0,item)

    //sequential search
    // var pos = 0;
    // for (; pos < this.data.length; pos++) {
    //     if (item < this.data[pos])
    //         break;
    //     // else
    //     //     pos++;
    // }
    
}

OrderedList.prototype.bSearch  = function(key){
    var start=0, end=this.data.length-1, mid
    while(start<=end){
        mid = Math.floor((start+end)/2);
        //if find return index ,else -1
        if(key == this.data[mid]){
            return mid;
        }else if(key < this.data[mid]){
            end = mid-1;
        }else{
            start = mid+1;
        }
    }
    return -1;
}

var myOL = new OrderedList();
myOL.insert(5);
myOL.insert(2);
myOL.insert(6);
myOL.insert(19)
myOL.insert(15)
myOL.insert(11)
myOL.insert(13)
myOL.insert(8)
myOL.insert(9)
myOL.insert(7)

console.log(myOL.bSearch(9))