import db from '../db/connection.js'

const createClient = async (nombre, nit, id, checklists) => {
    try {
        const [result] = await db.promise().query(
            `INSERT INTO clientes (nombre, nit, id_usuario_admin, checklists) VALUES (?, ?, ?, ?)`, [nombre, nit, id, checklists.join(',')]
        );
        // Verificar si se insertó correctamente y obtener el ID del cliente
        const clienteId = result.insertId;
        if (clienteId) {
            return { success: true, clienteId };
        } else {
            return { success: false, message: "Error al crear el cliente" };
        }
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        return { success: false, message: error.message };
    }
}

export { createClient }
