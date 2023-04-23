const DefaultError = require('../../mysql/errors/DefaultError')
function divide (a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new DefaultError("a or b is not a number")
    }
    return a / b
}

function isEven(x) {
    try {
        const a = 1;
        a = x;
        return a % 2 === 0
    } catch (e) {
        console.log(e.toString())
        return false
    }
}

function print() {
    try {
         const result = isEven('124')
        console.log(result)
    } catch (e) {
        console.error(e.toString())
    }
}

print()

// let x = 'fdas'
// console.log(!!x);