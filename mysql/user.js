
const connectionOps = require('./connection.js')

async function addUser(user){
    let connection = await connectionOps.CreateConnection()

    let email_query = "SELECT `email` FROM `bank`.`users`;"
    let [email_rows,email_fields] = await connection.execute(email_query)
    for (let i=0; i< email_rows.length;i++){
        if (email_rows[i].email == user.email){
            console.log(' email already in use ')
            return false
        }
    }
    let query =  "INSERT INTO `bank`.`users` (`id`, `firstname`, `lastname`, `email`, `address1`, `address2`, `city`, `state`, `zipcode`, `balance`,`createddate`,`updateddate`)" +
        "VALUES ('"+user.id+"', '"+user.firstname+"', '"+user.lastname+"', '"+user.email+"', '"+user.address1+"','"+user.address2+"', '"+user.city+"', '"+user.state+"', '"+user.zipcode+"', '"+user.balance+"','"+user.createddate+"','"+user.updateddate+"');"
    let [rows, fields] = await connection.execute(query);
    console.log(rows)
    return true
}

async function updateUser(id,user){
   let connection = await  connectionOps.CreateConnection()
    let query = "UPDATE `bank`.`users` SET `firstname` = '"+user.firstname+"', `lastname` = '"+user.lastname+"', `email` = '"+user.email+"', `address1` = '"+user.address1+"'," +
        "`address2` = '"+user.address2+"', `city` = '"+user.city+"', `state` = '"+user.state+"', `zipcode` = '"+user.zipcode+"', `balance` = '"+user.balance+"',`updateddate` = '"+new Date().toJSON().slice(0,18)+"' WHERE (`id` = '"+id+"');"
    let [rows, fields] =  await connection.execute(query);
   console.log(rows)
}

async function getUser(id){
let connection = await connectionOps.CreateConnection()
    let query = "SELECT * FROM `bank`.`users` WHERE id ='"+id+"';"
    let[rows, fields] = await connection.execute(query);
    return rows[0];
}



async function searchUser(name){
    let connection = await connectionOps.CreateConnection()
    let query = "select * from `bank`.`users` where firstname = '"+name+"' || lastname = '"+name+"';"
    let[rows, fields] = await connection.execute(query);
    console.log(rows)
    return rows
}

async function getUsers(){
    let connection = await connectionOps.CreateConnection()
    let query = "SELECT * FROM `bank`.`users`;"
    let[rows, fields] = await connection.execute(query);
    console.log(rows)
    return rows
}


module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    getUser: getUser,
    searchUser: searchUser,
    getUsers: getUsers
}
