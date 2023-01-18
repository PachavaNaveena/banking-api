const userOperations = require("./User");
function isSenior(user, index){
    return user.ageCategory === 'senior'
}

function addAgeCategory(user, index) {
    if (user.age > 60) {
        user.ageCategory = 'senior'
    } else {
        user.ageCategory = 'young'
    }
    return user
}
function addAge (user, index) {
    user.age = Math.floor((Math.random() * 100));
    return user
}

let users = userOperations.getUsers()
users = users.map(addAge).map(addAgeCategory).filter(isSenior)

const user = users.find(function(user, index) {
    return user.age > 60
})


console.log(user, users);