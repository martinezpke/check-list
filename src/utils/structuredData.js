export const structureResponse = (data) => {
    const structuredData = {};

    data.forEach((item) => {
        if (!structuredData[item.checklist_nombre]) {
            structuredData[item.checklist_nombre] = {
                id: item.id,
                preguntas: [],
            };
        }

        structuredData[item.checklist_nombre].preguntas.push({
            id: item.id,
            pregunta: item.pregunta,
        });
    });

    // Mostrar los detalles de cada pregunta
    /* console.log(JSON.stringify(structuredData, null, 2)); */
    
    return structuredData;
};
