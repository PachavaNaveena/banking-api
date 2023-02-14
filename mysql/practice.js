const transactionOperations = require("./transaction");
let arr = [{num:10,class:'ero'},{num:20, class:'zym'} ,{num:30,class:'zumba'},{num:40,class:''}]
let arr2 = {FN:'naveena',LN:'pachava',city:'ongole',mobile:'23456789'}
let arr3 = {FN:'bhavana',LN:'pachava',city:'ongole',mobile:'23456789'}

function test(){
for (let i=0; i< arr.length;i++){
    if (arr[i].num != 20){
        console.log(arr[i].num)
    }
}
}
//test()

function test1(){
    let arr1 =[]
    for (let i=0; i< arr.length;i++) {
        if(arr[i].class !== ''){
            arr1.push(arr[i].class)
        }
    }
    return arr1
}
//let x = test1()
//console.log(x)
//
// let y = Object.keys(arr2)
// console.log(y[2])

