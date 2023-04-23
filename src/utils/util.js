const moment = require("moment-timezone");

function getCurrentDate(){
    return moment().tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss'); //moment().tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
    getCurrentDate: getCurrentDate
}