const express = require('express');
const app = express()
const movies = require('./movies.json')

const PORT = process.env.PORT ?? 3312;

app.disable('x-powered-by') // desabilita el header x-powered-by

app.get('/',(req,res)=>{
    req.statusCode = 200
    console.log(req.statusCode)
    console.log('_________________')
    res.json({message: 'hola mundo'})
})

app.get('/movies',(req, res)=>{
    req.statusCode = 201
    console.log(req.statusCode)
    console.log('Recover all movies')
    console.log('____________________')
    res.json(movies)
})

app.listen(PORT,()=>{
    console.log(`the server is get up in the port: http://localhost:${PORT}`)
})