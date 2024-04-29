import { getCheckList } from '../models/client.js';
import { structureResponse } from '../utils/structuredData.js';

export const getAsk = async ( id ) => {
    try {
        const data = await getCheckList(id);
        if (data.success) {
            const structuredData = structureResponse(data.result);

            return {check: structuredData, client: data.resultClient}
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al consultar en el modelo', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};