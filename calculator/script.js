
const onButtonClick = (value) => {
    let input = document.querySelector('.display').value
    let output = input + value
    if(input === '0'){
        document.querySelector('.display').value = parseInt(output)
    } else if (value>=0 && value<=9){
        document.querySelector('.display').value = output
    }else {
        let x = calculate()
        if(x==true ){
            document.querySelector('.display').value = output
        }
    }
}

const calculate = () =>{
    try{
        let result = document.querySelector('.display').value
        result = eval(result)
        document.querySelector('.display').value = result
        return true
    } catch (e){
        console.log(e)
        alert('please input number')
        return false
    }
}

const clearscreen = () =>{
document.querySelector('.display').value = '0'
}