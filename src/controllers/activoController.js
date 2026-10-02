const db = require("../database/db")

//En este archivo solo se crean metodo JS
//No se definen las rutas ni los verbos (GET-POST-PUT-DELETE)

//req (require) : solicitud o pedido (input)
//res (result)  : resultado o respuesta (output)

const obtenerActivos = async(req, res) => {
  try{
    //Consulta > ORM
    const activos = await db("activos").select("*");

    return res.status(200).json({
      success: true,
      data: activos
    });

  }catch(error){
    console.error(`Error al leer activos: `, error);

    return res
    .status(500)
    .json({
      success: false,
      message: 'Error al obtener activos'
    })
  }
};


const obtenerActivoPorId = async(req, res) => {
  try{
    //La busqueda necesita el ID que pasa en la URL (parámetro)
    const {id} = req.params;

    const activo = await db("activos").where({id}).first();

    if(!activo){
      return res
      .status(404)
      .json({
        success: false,
        message: 'No existe este activo'
      })
    }

    return res
    .status(200)
    .json({
      success: true,
      data: activo
    })

  }catch(error){
    console.log("No se pudo ejecutar la busqueda: ", error)

    return res
    .status(500)
    .json({
      success: false,
      message: 'Error interno en el servidor'
    })
  }
};


const crearActivo = async(req, res) => {
  try{
    const {
      idcategoria,
      descripcion,
      fotografia,
      estado,
      precio
    } = req.body

    if(!idcategoria){
      return res
      .status(400)
      .json({
        success: false,
        message: 'El campo idcategoria es obligatorio'
      })
    }

    if(!descripcion){
      return res
      .status(400)
      .json({
        success: false,
        message: 'El campo descripcion es obligatorio'
      })
    }

    if(!precio){
      return res
      .status(400)
      .json({
        success: false,
        message: 'El campo precio es obligatorio'
      })
    }

    const [idGenerado] = await db("activos").insert({
      idcategoria,
      descripcion,
      fotografia,
      estado,
      precio
    })

    return res.status(201).json({
      success: true,
      message: 'Activo creado correctamente',
      data: {
        id: idGenerado
      }
    })

  }catch(error){
    console.error("Error al crear activo: ", error)

    return res
    .status(500)
    .json({
      success: false,
      message: 'Error al crear activo'
    })
  }
};


const actualizarActivo = async(req, res) => {
  try{
    //Obtener el id de la URL
    const {id} = req.params

    //Obtener los datos del JSON
    const {
      idcategoria,
      descripcion,
      fotografia,
      estado,
      precio
    } = req.body

    if(!idcategoria){
      return res
      .status(400)
      .json({
        success: false,
        message: 'El campo idcategoria es obligatorio'
      })
    }

    if(!descripcion){
      return res
      .status(400)
      .json({
        success: false,
        message: 'El campo descripcion es obligatorio'
      })
    }

    if(!precio){
      return res
      .status(400)
      .json({
        success: false,
        message: 'El campo precio es obligatorio'
      })
    }

    const filasAfectadas = await db("activos")
      .where({id})
      .update({
        idcategoria,
        descripcion,
        fotografia,
        estado,
        precio
      })

    if(!filasAfectadas){
      return res
      .status(404)
      .json({
        success: false,
        message: 'El activo no existe'
      })
    }

    //Hemos pasado las validaciones
    return res
    .status(200)
    .json({
      success: true,
      message: 'Activo actualizado correctamente'
    })

  }catch(error){
    console.error('No es posible actualizar: ', error)

    return res
    .status(500)
    .json({
      success: false,
      message: 'No es posible actualizar este activo'
    })
  }
};


const eliminarActivo = async(req, res) => {
  try{
    const {id} = req.params

    const filasAfectadas = await db("activos")
      .where({id})
      .del();

    if(!filasAfectadas){
      return res
      .status(404)
      .json({
        success: false,
        message: 'No existe el activo'
      })
    }

    return res
    .status(200)
    .json({
      success: true,
      message: 'Se ha eliminado correctamente'
    })

  }catch(error){
    console.error("No se pudo eliminar el activo: ", error)

    return res
    .status(500)
    .json({
      success: false,
      message: 'No se puede eliminar el activo'
    })
  }
};


//Estas acciones deben ser de utilidad (necesarias) para las rutas
module.exports = {
  obtenerActivos,
  obtenerActivoPorId,
  crearActivo,
  actualizarActivo,
  eliminarActivo
}
