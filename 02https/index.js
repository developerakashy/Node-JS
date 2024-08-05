const http = require('http')
const fs = require('fs')
const url = require('url')

const myServer = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end()
    const log = `${Date.now()}: ${req.url} New Request Received\n`

    const myURL = url.parse(req.url, true)
    console.log(myURL)
    fs.appendFile('./log.txt', log, (err, result) => {

        switch(myURL.pathname){
            case '/':
                if(req.method === 'GET'){
                    res.end('Home Page')
                }
                break
            case '/about':
                const username = myURL.query.username;
                res.end(`I am ${username}`);
                break;
            case '/search':
                const search = myURL.query.search_param
                const id = myURL.query.id
                res.end(`Here is your search for ${search} of ID: ${id}`)
                break
            default: res.end('page not found')

        }
    })

})

myServer.listen(8000, () => console.log('Server Started!'))
