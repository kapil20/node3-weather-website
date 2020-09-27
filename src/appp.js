const express = require('express')

const app = express()

app.get('', (req, res)=>{
    res.send({
        name: 'kapil',
        age:36
    })
})


app.listen(3000, ()=>{
    console.log('server is running')
})