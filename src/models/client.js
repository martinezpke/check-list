import { query } from 'express';
import db from '../db/connection.js'

const getIdRating = async ( id ) => {
    try {
        const [result] = await db.promise().query(
            `SELECT * FROM check_list.rating WHERE id = ?`, [id]
        )

        if (result) {
            return { success: true, result };
        } else {
            return { success: false, message: "No hay temas" };
        }
    } catch (error) {
        console.error("Error al buscar rating:", error);
        return { success: false, message: error.message };
    }
}

const setRtAw = async (datas) => {
    try {
        await db.promise().beginTransaction();
        const [result] = await db.promise().query(
            `INSERT INTO rating (id_client, result, status) VALUES (?, ?, ?)`,
            [datas.idCliente, parseFloat(datas.ValueRating), parseInt(datas.statusForm)]
        )
        const ratingId = result.insertId;

        if (ratingId) {
            for (const key of Object.keys(datas)) {
                if (key.startsWith('evaluation_')) {
                    const preguntaId = parseInt(key.split('_')[1]);
                    const respuestaValue = datas[key] === 'yes' ? 1 : 0;
                    await db.promise().query(
                        `INSERT INTO respuestas (id_pregunta, id_rating, respuesta) VALUES (?, ?, ?)`,
                        [preguntaId, ratingId, respuestaValue]
                    );
                }
            }

            // Confirmar la transacción
            await db.promise().commit();

            return { success: true, id: ratingId };
        } else {
            return { success: false, msg: "Error al guardar el resultado" };
        }
    } catch (error) {
        // Revertir la transacción en caso de error
        await db.promise().rollback();

        console.error("Error al guardar la pregunta:", error);
        return { success: false, message: error.message };
    }
};


const createClient = async (nombre, nit, id, checklists, imgUrls) => {
    try {
        const [result] = await db.promise().query(
            `INSERT INTO clientes (nombre, nit, id_usuario_admin, checklists, image_url) VALUES (?, ?, ?, ?, ?)`, [nombre, nit, id, checklists.join(','), imgUrls]
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

const getListClient = async () => {
    try {
        const [result] = await db.promise().query(
            `SELECT * FROM clientes`
        )

        if (result) {
            return { success: true, result };
        } else {
            return { success: false, message: "No hay temas" };
        }

    } catch (error) {
        console.error("Error al buscar:", error);
        return { success: false, message: error.message };
    }
}

const getAllRatingId = async (idClient, idrating) => {
    try {
        const [result] = await db.promise().query(
            `SELECT respuestas.id, respuestas.id_pregunta, respuestas.respuesta, respuestas.fecha_respondida
            FROM respuestas
            JOIN rating ON respuestas.id_rating = rating.id
            WHERE rating.id_client = ?
            AND rating.id = ?;`, [idClient, idrating]
        )

        if (result) {
            return { success: true, result };
        } else {
            return { success: false, message: "No hay respuesta" };
        }

    } catch (error) {
        console.error("Error al buscar:", error);
        return { success: false, message: error.message };
    }
}

const getListThemes = async () => {
    try {
        const [result] = await db.promise().query(
            `SELECT id, nombre FROM checklists`
        )

        if (result) {

            return { success: true, result };
        } else {
            return { success: false, message: "No hay temas" };
        }

    } catch (error) {
        console.error("Error al buscar:", error);
        return { success: false, message: error.message };
    }
} 

const getCheckList = async (id) => {
    try {
        const [resultClient] = await db.promise().query(
            `SELECT * FROM clientes WHERE id = ?`, [id]
        );

        if (resultClient.length > 0) {
            const checklistsValue = resultClient[0].checklists;
            const checklistsArray = checklistsValue.split(',').map(Number); // Convertir la cadena en un array de números

            const [result] = await db.promise().query(
                `SELECT c.nombre AS checklist_nombre, p.id, p.pregunta, p.importancia
                FROM checklists c
                JOIN preguntas p ON c.id = p.id_checklist
                WHERE c.id IN (?)`, [checklistsArray]
            );

            if (result.length > 0) {
                return { success: true, result, resultClient };
            } else {
                return { success: false, message: "No hay preguntas asociadas a los checklists proporcionados." };
            }
        } else {
            console.log('No se encontró ningún cliente con ese ID.');
            return { success: false, message: "No se encontró ningún cliente con ese ID." };
        }

    } catch (error) {
        console.error("Error al buscar:", error);
        return { success: false, message: "Error al buscar: " + error.message };
    }
};


const createTheme = async (name, preguntas, importancias ) => {
    try {
        // Comenzar una transacción
        await db.promise().beginTransaction();

        const [result] = await db.promise().query(
            `INSERT INTO checklists (nombre) VALUES ( ? )`, [name]
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



export { createClient, createTheme, getListClient, getCheckList, getListThemes, setRtAw, getIdRating, getAllRatingId}
