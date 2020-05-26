import Serie from '../models/Serie';

class SerieController {
  // Retrieve and return all series from the database.
  async index(req, res) {
    let {limit = 25, page = 1} = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    const filter = {conclude: true};
    const props = {
      _id: 1,
      title: 1,
      uriPage: 1,
      posterStart: 1,
      resume: 1,
      date: 1,
      language: 1,
      conclude: 1,
      category: 1,
    };
    const series = await Serie.find(filter, props)
      .skip((page - 1) * limit)
      .limit(limit);
    return res.json({series, page, count: limit});
  }

  async find(req, res) {
    const filter = {...req.query, conclude: true};
    const props = {
      _id: 1,
      title: 1,
      uriPage: 1,
      posterStart: 1,
      resume: 1,
      date: 1,
      language: 1,
      conclude: 1,
      category: 1,
    };
    const serie = await Serie.find(filter, props);
    return res.json(serie);
  }
}

export default new SerieController();
