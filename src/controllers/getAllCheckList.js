import { getListThemes } from "../models/client.js";

export const getAllCheckList = async () => {
    try {
        const data = await getListThemes()
        if (data.success) {
            return {checks: data.result}
        } else {
            return {msg: data.message}
        }
    } catch (error) {
        console.error('Error al consultar los check', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}