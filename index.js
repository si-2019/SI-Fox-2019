const express = require('express')
const app = express()
const port = 31906

app.get('/', (req, res) => res.send('Hello World from FOX!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))