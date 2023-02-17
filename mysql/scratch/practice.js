const transactionOperations = require("../services/transaction");
const moment = require("moment");
let arr = [{num:10,class:'ero'},{num:20, class:'zym'} ,{num:30,class:'zumba'},{num:40,class:''}]
let arr2 = {FN:'naveena',LN:'pachava',city:'ongole',mobile:'23456789'}
let arr3 = {FN:'bhavana',LN:'pachava',city:'ongole',mobile:'23456789'}

let user =  [
    { email: 'abhi@' },
        { email: 'nav@' },
        { email: 'bhu ' },
        { email: 'kavy@' },
        { email: 'kay' },
        { email: 'nav@' },
        { email: 'bav@' },
        { email: 'chai@' },
        { email: 'sathvi@' },
        { email: 'sarath@' },
        { email: 'bav@' },
        { email: 'sarada@' }
    ]

    let array = [
        {
        id: '4',
        firstname: 'Chaitanya',
        lastname: 'Mannam'
        },
        {
            id: '6',
    firstname: 'sathvik',
    lastname: 'Veerapaneni'
        }
]



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
function y(){
    let x = moment().toISOString().slice(0,19)
    return x
}
//let a = y()
//console.log(a)

//console.log(moment().toISOString())

console.log(array[0].firstname)