const express = require('express');
const crypo = require('node:crypto')
const app = express()
const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./validate.js')


const PORT = process.env.PORT ?? 3312;

app.disable('x-powered-by') // desabilita el header x-powered-by

// middleware
app.use(express.json())

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
    req.statusCode = 200
    console.log(req.statusCode)
    console.log('_______________')
    if(genre){
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.status(404).json({message: 'Movie not found for that genre'})
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(404).json({ error: JSON.parse(result.error.message) })
  }
  req.statusCode = 201
  console.log(req.statusCode)
  console.log('movie created')
  console.log('_______________')
  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data
  }

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.listen(PORT,()=>{
    console.log(`the server is get up in the port: http://localhost:${PORT}`)
})