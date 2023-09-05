import express from "express";
import db from './utils/database.js';
import User from './models/users.model.js';
import 'dotenv/config';

User;
// variable de entorno llamada PORT
const PORT = process.env.PORT ?? 8000;
// probar conexión con la base de datos
db.authenticate()
  .then(() => {
    console.log('Conexión correcta');
  })
  .catch((error) => console.log(error));

db.sync() // si no existe la tabla -> la crea / si ya existe no hace nada
  .then(() => console.log('base de datos sincronizada'))
  .catch(error => console.log(error))
//
const app = express();

app.use(express.json());

// health check
app.get('/', (req, res) => {
  res.send('OK');
});

// CREATE USER
// Cuando se haga uan request a /users POST crear un usuario
app.post('/users', async (req, res) => {
  try {
    const { body } = req;
    // mandar esta info a la base de datos
    // * INSERT INTO users (username, email, password)
    const user = await User.create(body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

// READ USERS
// GET /users -> devolver un json con todos los usuarios en la base de datos
// SELECT * FROM users;
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

// SELECT * FROM users WHERE id = 4;
// GET /users 
// ? como mandamos el id en este get
// path params
// /pokemon/:id
app.get('/users/:id', async(req, res) => {
  try {
    const { id } = req.params; // params es un objeto {id: 4}
    const user = await User.findByPk(id);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE ...... WHERE id = 5;
// PUT '/users' -> path params
// la información a actualizar por el body
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    // primer objeto es la info
    // segundo objeto es el where
    const user = await User.update(body, {
      where: { id } // -> { id : id }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
})


app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: {id}
    });
    res.status(204).end()
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

