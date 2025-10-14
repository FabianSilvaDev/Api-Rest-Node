const express = require('express');
const app = express()
const movies = require('./movies.json')

const PORT = process.env.PORT ?? 3312;

app.disable('x-powered-by') // desabilita el header x-powered-by

// endpoints are path where there is a sourse

app.get('/',(req,res)=>{
    req.statusCode = 200
    console.log(req.statusCode)
    console.log('_________________')
    res.json({message: 'Hello world'})
})

app.get('/movies',(req, res)=>{
    req.statusCode = 200
    console.log(req.statusCode)
    console.log('Recover all movies')
    console.log('____________________')
    res.json(movies)
})

app.get('/movies/:id/', (req,res)=>{ //path-to-regexp
    const {id} = req.params
    req.statusCode = 200
    console.log(req.statusCode)
    console.log('_______________')
    // returns the value of the first element in the array that matches the provided test function.
    const movie = movies.find(movie => movie.id === id)
    if(movie) return res.json(movie)
    res.status(404).json({message: 'Movie not found'})
})

app.get('/movies/:gender',(req,res)=>{
    const {genre} = req.query
})

app.listen(PORT,()=>{
    console.log(`the server is get up in the port: http://localhost:${PORT}`)
})