const X = new XMLHttpRequest()
X.open('post','http://localhost:3000/user',true) //  /mysql/index.js
X.onreadystatechange = function () {
    if(X.readyState === 4){
        if(X.status === 200){
            document.getElementById('dom').textContent = X.responseText
        }
        if(X.status === 404){
            console.log("page not found")
        }
    }
}
X.send()