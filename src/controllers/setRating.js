import { setRtAw } from '../models/client.js'
import { getIdRating } from '../models/client.js'
import { getAsk } from './getAsk.js'
import { getAllRatingId } from '../models/client.js'

export const setRating = async (req, res) => {
  const data = req.body
  const id = req.params.id
  try {
    const resultRating = await setRtAw(data)
    if (resultRating.success) {
      const idCliente = await getIdRating(resultRating.id)
      const listRating = await getAllRatingId(id, idCliente.result[0].id)
      const queryString = `?idCliente=${idCliente.result[0].result}&respuestas=${JSON.stringify(listRating.result)}`
      res.redirect(`/checklist/${id}${queryString}`)
    }
  } catch (error) {
    console.error('Error al consultar en el modelo', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
