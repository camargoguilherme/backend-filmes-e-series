import * as Parser from '../parsers/SeriesCheerio';

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

export default new ParserController();
