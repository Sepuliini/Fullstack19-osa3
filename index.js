const http = require('http')

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



const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(persons))
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)