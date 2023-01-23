const fileOperations = require('./db')
const fileName = "users"
function addUser(user) {
    let users = fileOperations.readFromFile(fileName)
    if (users) {
        users.push(user)
    } else {
        users = [user]
    }
    fileOperations.writeToFile(fileName, users)
}

function updateUser(accountNumber, user) {
    let users = fileOperations.readFromFile(fileName)
    for (let i=0; i<users.length;i++) {
        if (users[i].accountNumber === accountNumber) {
             users[i] = user
            fileOperations.writeToFile(fileName, users)
            return true
        }
    }
    return false
}

function getUser(accountNumber) {
    let users = fileOperations.readFromFile(fileName)
    for (let i=0; i<users.length;i++) {
        if (users[i].accountNumber === accountNumber) {
            return users[i]
        }
    }
    return console.log("dosent exist with" + accountNumber)
}

function getUsers() {
    let users = fileOperations.readFromFile(fileName)
    if(users.length != 0) {
        return users
    } else{
        console.log("zero users");
        return false
    }
}

function searchUser(Name) {
    let searchResult=[]
     let users = fileOperations.readFromFile(fileName)
     for(let i=0; i<users.length;i++) {
         if ( users[i].firstName.toLowerCase() === Name.toLowerCase()  || users[i].firstName.toLowerCase() === Name.toLowerCase()) {
             searchResult.push(users[i])
         }
     }
    return searchResult
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    getUser: getUser,
    searchUser: searchUser,
    getUsers: getUsers
}
