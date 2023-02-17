const userOperations = require("./User");
function isSenior(user, index){
    return user.ageCategory === 'senior'
}

// adding age category item
 const addAgeCategory =(user, index) =>{
    if (user.age > 60) {
        user.ageCategory = 'senior'
    } else {
        user.ageCategory = 'young'
    }
    return user
}

// adding age
const caddAge = (user, index) => {
    user.age = Math.floor((Math.random() * 100));
    return user
}

// map - if given any will map to each and every element in array
// filter - as like map goes to every element in array but search with a condition in each array
// find - as like map filter enters in to each element in array , finds with particular logic , if found stops the process
//foreach - goes to each element in array

let users = userOperations.getUsers()
users = users.map(addAge).map(addAgeCategory).filter(isSenior) // using MAP, FILTER

const user = users.find((user, index) => {  //using FIND
    return user.age > 60
})


console.log(user, users);