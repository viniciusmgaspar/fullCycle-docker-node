import express from 'express';
import mysql from 'mysql';
import faker from 'faker';

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const port = 3333;
const app = express();

const insertRow = (connection) => new Promise((resolve) => {
  const nome = faker.name.findName()
  const sql = `INSERT INTO people(name) values('${nome.replace(/["']/g, '')}');`
  connection.query(sql, (error, result) => {
    resolve(result);
  });
});

const getPeople = (connection) => new Promise((resolve) => {
  connection.query('SELECT * FROM people;', (error, result) => {
    resolve(result);
  });
})

app.get("/", async (req, res) => {
  const connection = mysql.createConnection(config);
  await insertRow(connection);

  const results = await getPeople(connection);

  await connection.end();

  const names = results.map(result => {
    return `<tr><td>${result.name}</td></tr>`;
  })

  res.send(`
    <div>
        <h1>Full Cycle Rocks!!</h1>
        <p>
            - Nomes cadastrados no banco mySql.
        </p>
        <table border="1">
          <tr><td>Nome</td></tr>
            ${names.join("\n")}
        </table>
    </div>
  `);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
})