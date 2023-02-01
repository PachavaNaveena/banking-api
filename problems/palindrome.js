
/*
const isPalindrome = (word) => {
   const length = word.length
    for(let i=0;i<=length/2;i++){
        if(word[i]==word[length-1-i])
            return true
    }
    return false
}

 */

const isPalindrome = (word) =>{
    let array = Array.from(word).reverse().join('')
    if(array == word)
        return true
    else
        return false
}


const passed = (val) => val ? "PASSED " : "FAILED"


console.log(`Test case 1: MADAM: ===> ${passed(isPalindrome('MADAM'))} `)
console.log(`Test case 2: PANAMA: ===> ${passed(!isPalindrome('PANAMA'))} `)
console.log(`Test case 3: RADAR: ===> ${passed(isPalindrome('RADAR'))} `)
console.log(`Test case 4: A: ===> ${passed(isPalindrome('A'))} `)
console.log(`Test case 4: A: ===> ${passed(isPalindrome(' '))} `)
console.log(`Test case 4: A: ===> ${passed(!isPalindrome('ab'))} `)



