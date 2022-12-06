const fs = require('fs')

function readFromFile(fileName) {
    try {
        const data = fs.readFileSync(`./data/${fileName}.json`, 'utf8');
        if (data) {
            return JSON.parse(data);
        }
        return []
    } catch (err) {
        console.error(err);
        return []
    }
}

function writeToFile(fileName, data) {
    try {
        fs.writeFileSync(`./data/${fileName}.json`, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    writeToFile,
    readFromFile
}
