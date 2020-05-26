import Temporada from '../models/Temporada';

class TemporadaController {
  // Retrieve and return all temporadas from the database.
  async find(req, res) {
    Temporada.find(
      {...req.query},
      {_id: 1, title: 1, temporadas: 1, serie: 1, episodios: 1}
    )
      .populate('episodios')
      .exec()
      .then((temporadas) => {
        return res.send(temporadas);
      })
      .catch((err) => {
        return res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving temporadas.',
        });
      });
  }
}

export default new TemporadaController();
