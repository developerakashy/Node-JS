const fs = require('fs')

// fs.writeFileSync('./test.txt', 'Hi there!\n')

let result = fs.readFileSync('./test.txt', 'utf-8')

fs.readFile('./contacts.txt', 'utf-8', (err, res) => {
    if(err){
        console.log("Error ", err)
    }
    else{
        console.log(res)
    }
})

fs.appendFileSync('./test.txt', `${Date.now()} Hi\n`)

// fs.cpSync('./test.txt', './copy.txt')
// fs.unlinkSync('./copy.txt')

console.log(fs.statSync('./test.txt'))

console.log(result)
