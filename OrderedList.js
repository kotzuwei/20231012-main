class OrderedList {
    constructor() {
        this.data = []
    }
}
OrderedList.prototype.insert = function (item) {
    //bsearch
    //跟底下bsearch雷同

    //sequential search
    var pos = 0;
    for (; pos < this.data.length; pos++) {
        if (item < this.data[pos])
            break;
        else
            pos++;
    }
    this.data.splice(pos,0,item)
}

OrderedList.prototype.bSearch(key);{
    var start=0, end=this.data.length-1, mid;
    while(start<=end){
        mid = Math.floor((start+end)/2);
        if(key == this.data[mid]){
            return mid;
        }else if(key < this.data[mid]){
            end = mid;
        }else{
            start = mid;
        }
    }
    return -1;
}

var myOL = new OrderedList();
myOL.insert(5);
myOL.insert(2);
myOL.insert(6);