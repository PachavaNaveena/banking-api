
const userOperations = require('./user.js')
const transactionOperations = require('./transaction.js')

//--------------------------------USER OPERATIONS----------------------
//-----ADD USER--------
// userOperations.addUser({
//     id: '11',
//     firstname: 'sarada',
//     lastname: 'verapaneni',
//     email: 'sarada@',
//     address1: 'kanigiri',
//     address2: null,
//     city: 'ongole',
//     state: 'AP',
//     zipcode: 523002,
//     balance: 1000,
//     createddate: new Date().toJSON().slice(0,18),
//     updateddate: new Date().toJSON().slice(0,18)
// });


//-------UPDATE USER--------
//id: '1',
// balance: 0,
// createddate: new Date().toJSON().slice(0,18),
userOperations.getUser(7).then( result => console.log( result )); // --------- this syntax works to print the user
console.log(user.balance)//  ------not working
let user = userOperations.getUser(7)
console.log(user)

// let user = {         // for update shouldnt change ID,balance- (will change this when updating balance of user while doing transactions) , create date & update should be done if something changes in data
//     firstname: 'sarath',
//     lastname: 'Chunchu',
//     email: 'sarath@',
//     address1: '444 st',
//     address2: 'aspin',
//     city: 'bart',
//     state: 'OKC',
//     zipcode: 45577,
//     balance: 0,
//     updateddate: new Date().toJSON().slice(0,18)
// }
// userOperations.updateUser(7,user)


//---------FIND USER-----------
//userOperations.getUser(7)

//---------FIND USERS----------
//userOperations.getUsers()

//---------SEARCH USER----------
//userOperations.searchUser('pachava')

//-----------------------------------------------------aTRANSACTION OPERATIONS------------------------------------------
//-------DEPOSIT------------
//transactionOperations.deposit(3,500)
