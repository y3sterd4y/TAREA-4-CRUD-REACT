import * as productService from '../model/SongModel.js';

// Obtener todos los productos
// Esta función se encarga de obtener todos los productos de la base de datos y devolverlos como respuesta a la solicitud HTTP.

export const obtenerCanciones = async (req, res) => {
    try {
        const productos = await productService.obtenerTodasCanciones();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear un nuevo producto
// Esta función se encarga de crear un nuevo producto en la base de datos utilizando los datos enviados en la solicitud HTTP.

export const crearCancion = async (req, res) => {
    try {
        const { name_song, group_name, gender, popularity } = req.body;

        const newProduct = await productService.crearNuevaCancion(name_song,group_name,gender,popularity);
        res.status(201).json({id:newProduct,message: "cancion creado correctamente"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const actualizarCancion = async (req, res) => {
    try {
        const {id} = req.params;
        const buscar = await productService.buscarCancion(id);
    
        if (!buscar) return res.status(404).json({message: "No se encontró la canción"});
    
        await productService.actualizarNuevaCancion(id, req.body.name_song, req.body.group_name, req.body.gender, req.body.popularity);
        res.status(200).json({message: "Canción actualizada correctamente"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const eliminarCancion = async (req, res) => {
    try {
        const {id} = req.params;
        const buscar = await productService.buscarCancion(id);
    
        if (!buscar) return res.status(404).json({message: "No se encontró la canción"});
    
        await productService. eliminarNuevaCancion(id);
        res.status(200).json({message: "Canción eliminada correctamente"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}