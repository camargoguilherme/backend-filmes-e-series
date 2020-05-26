import Filme from '../models/Filme';

class FilmeController {
  // Retrieve and return all movies from the database.
  async index(req, res) {
    Filme.find()
      .then((filmes) => {
        res.send(filmes);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Ocorreu um erro ao recuperar os filmes',
        });
      });
  }
}

export default new FilmeController();
