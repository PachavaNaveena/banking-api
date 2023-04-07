const printMatrix = (n) => {
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j=0; j< n; j++) {
            row += ((i * n) + j + 1) + " "
        }
        console.log(row)
    }
}


const createNumbers = () => {
    const rows = [];
    const n = 3;
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j=0; j< n; j++) {
            row.push((i * n) + j + 1)
        }
        rows.push(row)
    }
    return rows
}

console.log(createNumbers());

// printMatrix(3)
// n = 3
//
// (i * n) + j + 1
// 1 2 3
// 4 5 6
// 7 8 9
//
// (i,j)
//
// 5 (1, 1), 3
// 4 (1, 0), 3


const x = [1, 2, 3]

const [a] = x

console.log(parseInt('45+'))