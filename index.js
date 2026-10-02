const express = require('express')
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

//Middleware ya que la comunicacion se hace por JSON
app.use(express.json())

//importamos las rutas de la categoria
const categoriaRoutes = require('./src/routers/categoriaRouters')

//Implementar rutas
app.use('/api/categorias', categoriaRoutes)

const activoRoutes = require('./src/routers/activoRouters');

app.use('/api/activos', activoRoutes);


app.get("/", (req, res) => {
  res.send("API de logistica funcionando correctamente")
})

//Iniciamos el servidor
app.listen(PORT, () => {
  console.log("Servidor iniciado en http://localhost:3000")
})