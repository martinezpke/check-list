import { getListClient } from '../models/client.js';

export const getCliente = async (req, res) => {
    try {
        const data = await getListClient()
        if (data.success) {
            return data.result
        } else {
            return false;
        }
        
    } catch (error) {
        console.error('Error al consultar en el modelo', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}