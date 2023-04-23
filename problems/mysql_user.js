
const connectionOps = require('./connection.js')

async function adduser(user){
    const connection = await connectionOps.CreateConnection()
    const query =  "INSERT INTO `bank`.`users` (`id`, `firstname`, `lastname`, `email`, `address1`, `address2`, `city`, `state`, `zipcode`, `balance`,`createddate`,`updateddate`)" +
        "VALUES ('"+user.id+"', '"+user.firstname+"', '"+user.lastname+"', '"+user.email+"', '"+user.address1+"','"+user.address2+"', '"+user.city+"', '"+user.state+"', '"+user.zipcode+"', '"+user.balance+"','"+user.createddate+"','"+user.updateddate+"');"
    const [rows, fields] = await connection.query(query);
    console.log(rows)
}


const user = {
    id: '4',
    firstname: 'naveena',
    lastname: 'pachava',
    email: 'nav@',
    address1: 'aspin',
    address2: null,
    city: 'dallas',
    state: 'TX',
    zipcode: 76224,
    balance: 0,
    createddate: new Date().toJSON().slice(0,18),
    updateddate: new Date().toJSON().slice(0,18)
}


adduser(user)
// const firstname = 'naveena',lastname ='pachava'
// const fullname = 'INSERT INTO `bank`.`users` (`id`, `firstname`, `lastname`, `email`' +firstname+'INSERT INTO `bank`.`users` (`id`, `firstname`, `lastname`, `email`_'+lastname+'INSERT INTO `bank`.`users` (`id`, `firstname`, `lastname`, `email`'
// console.log(fullname)
//
//
//
 //console.log(query)