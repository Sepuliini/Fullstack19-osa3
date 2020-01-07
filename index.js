const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

let persons = [
  {
    name: "Arto Hellas",
    number: "040009642",
    id: 1,
    
  },
  {
    name: "Person personen",
    number: "050699942",
    id: 2,
    
  },
  {
    name: "Antti Mattila",
    number: "040509139",
    id: 3,
  },
  {
    name: "Antti uusimattila",
    number: "0405091666",
    id: 4,
  },
  {
    name: "Antti Kattila",
    number: "0405091666",
    id: 5,
  }
]

app.use(bodyParser.json())
morgan('tiny')
morgan.token('data',(request, response) => {
  console.log('konsoli:', request.body)
  return JSON.stringify(request.body)
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))

app.get('/info', (request, response) => {
  const maara = persons.length
  response.send(`
    <h3>info<h3>
    <p> Phonebook has info for ${maara} people <p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(persons))
})

app.get('/api/persons/id', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(persons))
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person == null) {
    response.status(404).end()
  } else {
    response.json(person)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  console.log("request:", request.body)
  console.log("body:", body)
  console.log("nimi:", body.name)
  console.log("numero:", body.number)

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  console.log("index of:", persons.filter(person => (person.name === body.name)))

  if (persons.filter(person => (person.name === body.name)).length > 0) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  if (persons.filter(person => (person.number === body.number)).length > 0) {
    return response.status(400).json({ 
      error: 'number must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
  response.json(person)
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const port = 3005
app.listen(port)
console.log(`Server running on port ${port}`)
console.log(persons)
//console.log(app)