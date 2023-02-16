const isPrime = (number) => {

    if(number==0||number==1)
    return false

   for(i=2;i<number;i++)
       if(number%i == 0)
           return false
    return true
}

// for(i=2;i<number;i++)
// number%i==0? isprime*=false :isprime*=true;

const passed = (val) => val ? "PASSED" : "FAILED"

console.log(`Test case 1: 7: ===> ${passed(isPrime(7))} `)
console.log(`Test case 2: 27: ===> ${passed(!isPrime(27))} `)
console.log(`Test case 3: 313: ===> ${passed(isPrime(313))} `)
console.log(`Test case 4: 17: ===> ${passed(isPrime(17))} `)
console.log(`Test case 5: 0: ===> ${passed(!isPrime(0))} `)
console.log(`Test case 5: 1: ===> ${passed(!isPrime(1))} `)
console.log(`Test case 6: 2: ===> ${passed(isPrime(2))} `)
console.log(`Test case 7: 15: ===> ${passed(!isPrime(15))} `)





