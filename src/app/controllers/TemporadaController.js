import Temporada from '../models/Temporada';

class TemporadaController {
  // Retrieve and return all temporadas from the database.
  async find(req, res) {
    console.log(req.query);
    try {
      const temporadas = await Temporada.find(
        {...req.query},
        {_id: 1, title: 1, temporadas: 1, serie: 1, episodios: 1}
      )
        .populate('episodios')
        .exec();
      // return res.send(temporadas);
      return res.send(
        temporadas.map((temporada) => {
          const dublado = [];
          const legendado = [];
          temporada.episodios.forEach((episodio) => {
            if (episodio.dublado) {
              dublado.push(episodio);
            } else {
              legendado.push(episodio);
            }
          });
          temporada.episodios = {dublado, legendado};
          return temporada;
        })
      );
    } catch (error) {
      return res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving temporadas.',
      });
    }
  }
}

export default new TemporadaController();
