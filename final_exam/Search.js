//使用for迴圈找到6的索引
var data = [2, 3, 1, 9, 6, 5, 7, 8, 0]
for (let index = 0; index < data.length; index++) {
    if (data[index] == 6)
        console.log("Found 6 at :" + index);
}

//indexOf:找數組中?(數字)的索引，no find return -1
console.log(data.indexOf(0))

var data1 = [
    { name: "Dan", age: 12 },
    { name: "Sam", age: 13 },
    { name: "Ben", age: 15 },
    { name: "Ken", age: 11 },
    { name: "Amy", age: 17 },
    { name: "Ali", age: 18 }
]

//find：找到符合條件的第一個元素
var key="Ben"
function findName(item){
    return item.name == key; //find Ben
}
function findAge(item){
    return item.age >= 17; //fine age>17
}

//filter：找到所有符合條件的元素
console.log(data1.filter(findAge));
console.log(JSON.stringify(data1));

