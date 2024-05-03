import { createTheme } from "../models/client.js";

export const controllerCreateTheme = async (req, res) => {
    const { name, cadenasPreguntas} = req.body;
    console.log(cadenasPreguntas)
    const arrayPreguntas = cadenasPreguntas.split(/,\s*/).map(item => item.trim()); 

    const importantes = arrayPreguntas.map(pregunta => pregunta.startsWith('*'));
    
    const preguntas = arrayPreguntas.map(pregunta => pregunta.startsWith('*') ? pregunta.substring(1) : pregunta);

    
    console.log(preguntas); 
    console.log(importantes);
    
    try {
        const response = await createTheme(name, preguntas, importantes)
        if (response.success){
            console.log("Tema creado exitosamente")
            const queryString = `?msg=Tema creado exitosamente`
            res.redirect(`/config${queryString}`)
        }
    } catch (error) {
        console.error('Error al crear el tema:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}