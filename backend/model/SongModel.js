import pool from "../config/db.js";

export const obtenerTodasCanciones = async () => {
    try {
        const [array] = await pool.query("SELECT * FROM favorites_songs");
        return array;
    } catch (error) {
        console.error("Error al obtener canciones:", error.message);
        throw error;
    }
};

export const crearNuevaCancion = async (name_song, group_name, gender, popularity) => {
    const [resultado] = await pool.query(`
            INSERT INTO favorites_songs (name_song, group_name, gender, popularity)
            VALUES (?, ?, ?, ?)    
        `,
        [name_song, group_name, gender, popularity]
    )

    return resultado.insertId; // Devuelve el ID del nuevo producto insertado
};

export const actualizarNuevaCancion = async (id, name_song, group_name, gender, popularity) => {
    await pool.query('UPDATE favorites_songs SET name_song = ?, group_name = ?, gender = ?, popularity = ? WHERE id = ?', [name_song, group_name, gender, popularity, id]);
}

export const buscarCancion = async (id) => {
    const [resultado] = await pool.query('SELECT * FROM favorites_songs WHERE id = ?', [id]);
    return resultado[0]; // Devuelve el primer resultado encontrado
}

export const eliminarNuevaCancion = async (id) => {
    await pool.query('DELETE FROM favorites_songs WHERE id = ?', [id]);
}