const isPrime = (number) => {
    return false
}

const passed = (val) => val ? "PASSED" : "FAILED"

console.log(`Test case 1: 7: ===> ${passed(isPrime(7))} `)
console.log(`Test case 2: 27: ===> ${passed(!isPrime(27))} `)
console.log(`Test case 3: 313: ===> ${passed(isPrime(313))} `)
console.log(`Test case 4: 17: ===> ${passed(isPrime(17))} `)
console.log(`Test case 5: 0: ===> ${passed(!isPrime(0))} `)
console.log(`Test case 5: 1: ===> ${passed(!isPrime(1))} `)
console.log(`Test case 6: 2: ===> ${passed(isPrime(2))} `)





