//Acceso a la BD
//Anteriormente.....
//mysql_connect()  : sql
//poolConecction() : sql
//Ahora: knex (Responsabilidad conexion) : orm
const express = require("express")
const router = express.Router()
const categoriaController = require('../controllers/categoriaController')

//Endpoint
router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoriaPorId);
router.post('/', categoriaController.crearCategoria);
router.put('/', categoriaController.actualizarCategoria);
router.delete('/:id', categoriaController.eliminarCategoria)



module.exports = router;