import { createClient } from "../models/client.js";

export const controllersClientCreate = async (req, res) => {
    const { nombre, nit, id , checklists} = req.body;

    try {
        const response = await createClient(nombre, nit, id, checklists)
        if (response.success) {
            console.log("Cliente creado exitosamente")
            res.status(201).json({ msg: 'Cliente creado exitosamente' })
        }
    } catch (e) {
        console.error('Error al crear el cliente:', e);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}