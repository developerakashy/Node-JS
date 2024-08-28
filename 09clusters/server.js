import cluster from 'cluster'
import express from  'express'
import { availableParallelism } from 'os'
import process from 'process'


const numCPUs = availableParallelism()


if(cluster.isPrimary){
    console.log(`Primary ${process.pid} is running`)

    for(let i=0; i<numCPUs; i++){
        cluster.fork()
    }


}else{
    const PORT = 8000
    const app = express()

    app.get('/', (req, res) => {
        return res.json({ message: `Hello from Express Server ${process.pid}`})
    })

    app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))
}
