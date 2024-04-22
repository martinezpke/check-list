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

const createTheme = async (name, descripcion, idChecklists, preguntas, importancias ) => {
    try {
        // Comenzar una transacción
        await db.promise().beginTransaction();

        const [result] = await db.promise().query(
            `INSERT INTO checklists (name, descripcion) VALUES ( ?, ? )`, [name, descripcion]
        )

        const checklistId = result.insertId;

        if (!checklistId) {
            throw new Error("No se pudo insertar el checklist");
        }

        const preguntaValues = preguntas.map((pregunta, index) => [checklistId, pregunta, importancias[index]]);

        await db.promise().query(
            `INSERT INTO preguntas (id_checklist, pregunta, importancia) VALUES ?`, [preguntaValues]
        )

        // Confirmar la transacción
        await db.promise().commit();

        /* 
        if (checklists) {
            preguntas.forEach(async (pregunta, index) => {
                const importancia = importancias[index]
                const [resultAsk] = await promise().query(
                    `INSERT INTO preguntas ( id_checklist, pregunta, importancia ) VALUES (?, ?, ?)`, [idChecklists, pregunta, importancia]
                )
            })

        } */
        return { success: true }
        
    } catch (error) {
        // Revertir la transacción en caso de error
        await db.promise().rollback();

        console.error("Error al crear el check-list: ", error)
        return { success: false, message: error.message };
    }
}

export { createClient, createTheme }
