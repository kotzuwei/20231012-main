//找到第?個數
var data = [2, 3, 1, 9, 6, 5, 7, 8, 0]
for (let index = 0; index < data.length; index++) {
    if (data[index] == 6)
        console.log("Found 6 at " + index);
}

console.log(data.indexOf(6)) //indexOf(要找ㄉ數)

var data1 = [
    { name: "Dan", age: 12 },
    { name: "Sam", age: 13 },
    { name: "Ben", age: 15 },
    { name: "Ken", age: 11 },
    { name: "Amy", age: 17 },
    { name: "Ali", age: 18 }
]
function findName(item){
    return item.name == "Amy";
}

function findAge(item){
    return item.age >= 17;
}

console.log(data1.find(findAge))