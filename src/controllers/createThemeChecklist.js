import { createTheme } from "../models/client.js";

export const controllerCreateTheme = async (req, res) => {
    const { name, cadenasPreguntas} = req.body;
    console.log(cadenasPreguntas)
    const arrayPreguntas = cadenasPreguntas.split(",").map(function(item) {
        return item.trim();
    });

    const importantes = arrayPreguntas.map(pregunta => pregunta.startsWith('*'));
    const preguntas = arrayPreguntas.map(pregunta => pregunta.substring(1));
    
    console.log(preguntas); 
    console.log(importantes);
    
    try {
        const response = await createTheme(name, preguntas, importantes)
        if (response.success){
            console.log("Tema creado exitosamente")
            res.status(201).res.render('config',{ msg: 'Tema creado exitosamente' })
        }
    } catch (error) {
        console.error('Error al crear el tema:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}