import fs from 'fs'
import express from 'express'
import status from 'express-status-monitor'
import zlib from 'zlib'

const PORT = 8000
const app = express()

app.use(status())

fs.createReadStream('./MOCK_DATA.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream('./MOCK_DATA.zip')))

app.get('/', (req, res) => {
    const stream = fs.createReadStream('./MOCK_DATA.txt', 'utf-8');
    stream.on('data', (chunk) => res.write(chunk));
    stream.on('end', () => res.end());
})


app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`))
