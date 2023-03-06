import express from 'express';
import mysql from 'mysql';
import faker from 'faker';


const app = express()
const port = process.env.APP_PORT || 3333

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
}


const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
  const name = faker.name.findName()

  connection.query(`INSERT INTO people (name) VALUES ('${name}')`)

  connection.query(`SELECT name FROM people`, (error, results, fields) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${!!results.length ? results.map(el => `<li>${el.name}</li>`).join('') : ''}
      </ol>
    `)
  })
})

app.listen(port, () => {
  console.log('Up on:', port);
})