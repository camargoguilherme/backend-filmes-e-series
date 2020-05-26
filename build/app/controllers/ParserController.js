"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _SeriesCheerio = require('../parsers/SeriesCheerio'); var Parser = _interopRequireWildcard(_SeriesCheerio);

class ParserController {
  async series(req, res) {
    const {urlPage} = req.query;
    if (!urlPage) {
      return res.status(400).json({mesage: "Param 'urlPage' is required"});
    }
    Parser.searchSeries(urlPage).then((_) => console.log('FINISHED'));

    return res.json({mesage: 'Realizando scraping das series'});
  }

  async temporadas(req, res) {
    const {urlSerie, limit, all} = req.query;
    console.log('Preparando Temporadas');
    if (urlSerie) {
      Parser.saveTemporadas(urlSerie).then((_) => console.log('FINISHED'));
      return res.json({mesage: 'Realizando scraping das temporadas'});
    }
    const limitSerie = parseInt(limit) || undefined;
    const allSeries = Boolean(all) || false;
    Parser.saveTemporadasAllSerie(limitSerie, allSeries).then((_) =>
      console.log('FINISHED')
    );

    return res.json({mesage: 'Realizando scraping das temporadas'});
  }

  async episodios(req, res) {
    console.log('Preparando Episodios');
    Parser.saveServerEpisodios().then(() => console.log('FINISHED'));
    return res.json({mesage: 'Realizando scraping das servers dos episodios'});
  }

  async delete(req, res) {
    console.log('Deletando Episodios');
    Parser.deleteEpisodios().then(() => console.log('FINISHED'));
    return res.json({mesage: 'Deletando Episodios'});
  }
}

exports. default = new ParserController();
