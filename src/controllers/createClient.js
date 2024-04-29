import { createClient } from "../models/client.js";

export const controllersClientCreate = async (req, res) => {
    try {
        const fileLogo = req.files['fileLogo'][0]; // Obtener el primer archivo de 'fileLogo'
        const { nombre, nit, id , checklists} = req.body;
        
        // Llama a la función para subir imágenes pasando el archivo
        const imgUrls = await uploadProfileImages(fileLogo);

        // Llama a la función para crear el cliente con las URL de las imágenes
        const response = await createClient(nombre, nit, id, checklists, imgUrls);

        if (response.success) {
            console.log("Cliente creado exitosamente");
            res.redirect('/config');
        } else {
            throw new Error(response.error);
        }
    } catch (e) {
        console.error('Error al crear el cliente:', e);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const uploadProfileImages = async ( imgPhoto ) => {
    try {  
      // Procesa la imagen de perfil
      const imgUrl = `/uploads/${imgPhoto.filename}`;
      
      // Devuelve la URL de la imagen al cliente
      return imgUrl;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw new Error('Hubo un error al subir la imagen.');
    }
};
