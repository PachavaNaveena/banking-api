const isPalindrome = (word) => {
    return false
}

const passed = (val) => val ? "PASSED" : "FAILED"

console.log(`Test case 1: MADAM: ===> ${passed(isPalindrome('MADAM'))} `)
console.log(`Test case 2: PANAMA: ===> ${passed(!isPalindrome('PANAMA'))} `)
console.log(`Test case 3: RADAR: ===> ${passed(isPalindrome('RADAR'))} `)
console.log(`Test case 4: A: ===> ${passed(isPalindrome('A'))} `)





