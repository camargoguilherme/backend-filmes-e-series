import request from 'request';
import cheerio from 'cheerio';

import Serie from '../models/Serie';
import Temporada from '../models/Temporada';
import Episodio from '../models/Episodio';
import Log from '../models/Log';

function urlify(text = '') {
  const urlRegex = /(?:(?:https?|ftp):\/\/)(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g;
  const url = text.match(urlRegex)[0];
  return url;
}

/*!
 * Group items from an array together by some criteria or value.
 * https://gomakethings.com/a-vanilla-js-equivalent-of-lodashs-groupby-method/
 * (c) 2019 Tom Bremmer (https://tbremer.com/) and Chris Ferdinandi (https://gomakethings.com), MIT License,
 * @param  {Array}           arr      The array to group items from
 * @param  {String|Function} criteria The criteria to group by
 * @return {Object}                   The grouped object
 */
function groupBy(arr = [], criteria) {
  return arr.reduce((obj, item) => {
    // Check if the criteria is a function to run on the item or a property of it
    const key =
      typeof criteria === 'function' ? criteria(item) : item[criteria];
    // If the key doesn't exist yet, create it
    if (!obj.hasOwnProperty(key)) {
      obj[key] = [];
    }

    // Push the value to the object
    delete item.key;
    obj[key].push(item);
    // Return the object to the next item in the loop
    return obj;
  }, {});
}

export async function deleteTemporadas(title) {
  const filter = {serie: title};
  const allTemp = await Temporada.find(filter);
  await Promise.all(
    allTemp.map((temp) => {
      temp.remove();
    })
  );
}

export async function deleteEpisodios(title) {
  const filter = {serie: title};
  const allEp = await Episodio.find(filter);
  await Promise.all(
    allEp.map((ep) => {
      ep.remove();
    })
  );
}

export function getDadosSeries(body, urlSerie) {
  let serie = {};
  try {
    const seletorCategorias = '.categoria-video';
    const seletorResumo = '.fundo > .margem > .esquerdavideox > .content > p';
    const seletorAnoLancamento = '.lancamento-video';
    const seletorIdioma = '.audio-video';

    if (body) {
      const $ = cheerio.load(body);
      const resume = $(seletorResumo).text().trim();
      const category = $(seletorCategorias).text().trim();
      const date = $(seletorAnoLancamento).text().trim();
      const language = $(seletorIdioma).text().trim();
      serie = {
        resume: resume.normalize(),
        category: category.normalize(), // .split(':')[1].split(','),
        date: date.normalize(), // .split(':')[1].split(','),
        language: language.normalize(), // .split(':')[1],
      };
    }
  } catch (err) {
    const saveError = {error: err, url: urlSerie};
    Log.create(saveError);
    serie = {};
  }
  return serie;
}

export function getTemporadas(body, urlSerie) {
  let temporadas = [];
  try {
    const seletorTemporada = '.um_terco';
    const episodios = [];
    const regexDublado = /dublado/i;
    const regexTemporada1 = /\d{1,2}\W{1,2}(T)\w{8}/i;
    const regexTemporada2 = /\d{1,2}(x)\d{1,2}/i;
    const regexTemporadaReplace1 = /\W{2}/i;
    if (body) {
      const $ = cheerio.load(body);

      $(seletorTemporada)
        .children('div')
        .children('ul')
        .children('li')
        .each((index, elem) => {
          let description = null;
          let uri = null;
          let title = null;

          try {
            title = $(elem).children('a').text();
          } catch (err) {
            // console.log(
            //   `${urlSerie} - ${title} - ${$(elem).children('a').html()}`,
            //   err
            // );
          }

          try {
            uri = $(elem).children('a').attr().href;
          } catch (err) {
            // console.log(
            //   `${urlSerie} - ${title} - ${$(elem).children('a').html()}`,
            //   err
            // );
          }

          try {
            description = $(elem).children('a').attr().title;
          } catch (err) {
            // console.log(
            //   `${urlSerie} - ${title} - ${$(elem).children('a').html()}`,
            //   err
            // );
          }

          if (description && title) {
            episodios.push({
              description: description.normalize(),
              title: title.normalize(),
              uri,
            });
          }
        });
      const tempReorg = episodios.map(({description, title, uri}) => {
        try {
          const dublado = !!description.match(regexDublado);
          let temporada = '';
          let key = '';

          if (!uri.startsWith('https://')) {
            uri = `https://www.bkseries.com${uri}`;
          }

          if (description.search(regexTemporada1) > -1) {
            temporada = description.match(regexTemporada1)[0];
            key = temporada.replace(regexTemporadaReplace1, '-').toLowerCase();
          } else {
            const temp = description.match(regexTemporada2)[0];
            temporada = `${temp.split('x')[0]} temporada`;
            key = `${temp.split('x')[0]}-temporada`;
          }

          const newuri = uri.replace('campanha', 'video/homenew');
          return {description, title, uri: newuri, dublado, temporada, key};
        } catch (err) {
          console.log(err);
        }
      });

      const epGroup = groupBy(tempReorg, 'key');
      Object.keys(epGroup).forEach((key) => {
        temporadas.push(epGroup[key]);
      });
    }
  } catch (err) {
    console.log(err);
    const saveError = {error: err, url: urlSerie};
    Log.create(saveError);
    temporadas = [];
  }
  return temporadas;
}

export function getDadosTemporadas(urlSerie) {
  return new Promise((resolve, reject) => {
    try {
      request(urlSerie, (error, response, body) => {
        if (response && response.statusCode === 200) {
          const dados = getDadosSeries(body, urlSerie);
          const temporadas = getTemporadas(body, urlSerie);
          resolve({dados, temporadas});
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function saveTemporadas(urlSerie) {
  const filter = {
    uriPage: urlSerie,
    conclude: false,
  };
  const serie = await Serie.findOne(filter);
  if (serie) {
    await deleteTemporadas(serie.title);
    await deleteEpisodios(serie.title);
    const {dados, temporadas} = await getDadosTemporadas(urlSerie);
    const savedTemporadas = await Promise.all(
      temporadas.map(async (temp) => {
        const ep = temp.map((eps) => ({...eps, serie: serie.title}));
        const episodios = await Episodio.create(ep);
        const temporada = {
          episodios,
          title: temp[0].temporada,
          serie: serie.title,
        };
        console.log(
          `SERIE: ${serie.title} - SEASSON: ${temporada.title} - SAVING ${episodios.length} EPISODES`
        );
        return Temporada.create(temporada);
      })
    );

    const update = {
      temporadas: [...savedTemporadas],
      ...dados,
      conclude: true,
    };

    await Serie.findOneAndUpdate(filter, update);
  }
}

export async function saveTemporadasAllSerie(limit = 25, all = false) {
  const filter = {conclude: false};
  const series = await Serie.find(filter).sort({title: 1}).limit(limit);

  await Promise.all(series.map((serie) => saveTemporadas(serie.uriPage)));

  if (all) {
    await saveTemporadasAllSerie(limit, all);
  }
}

export function getSeries(urlPage) {
  return new Promise((resolve, reject) => {
    try {
      const seletor = '.fundo > .margem > .esquerda > .lista-filmes';

      const series = [];
      request(urlPage, async (error, response, body) => {
        if (response && response.statusCode === 200) {
          const $ = cheerio.load(body);
          const SEARCH = urlPage.endsWith('https://www.bkseries.com') ? 1 : 0;
          $(seletor).each((index, elem) => {
            if (index === SEARCH) {
              $(elem)
                .children('li')
                .children('.capa')
                .each((index, elem) => {
                  const title = $(elem).children('img').attr().alt;
                  const serie = {
                    title: title.normalize(),
                    uriPage: $(elem).children('a').attr().href,
                    posterStart: $(elem).children('img').attr().src,
                  };
                  series.push(serie);
                });
            }
          });
          console.log(urlPage);
          console.log(`GETTING ${series.length} SERIES`);
          resolve(series);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function linkNextPage(urlPage) {
  return new Promise((resolve, reject) => {
    try {
      const seletor = 'a.next';
      request(urlPage, (error, response, body) => {
        if (response && response.statusCode === 200) {
          try {
            const $ = cheerio.load(body);
            const link = $(seletor).attr().href;
            resolve(link);
          } catch (err) {
            resolve(null);
          }
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function getLinkIframe(urlIframe) {
  return new Promise((resolve, reject) => {
    try {
      const seletor = '.conteudo';
      request(urlIframe, (error, response, body) => {
        if (response && response.statusCode === 200) {
          const $ = cheerio.load(body);
          const link = $(seletor).children('iframe').attr().src;
          resolve(link);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function getServers(urlServers) {
  return new Promise((resolve, reject) => {
    try {
      const seletor = '.itens';

      const url = urlify;
      const servers = [];
      request(urlServers, (error, response, body) => {
        try {
          if (response && response.statusCode === 200) {
            const $ = cheerio.load(body);
            $(seletor)
              .children('a')
              .each((index, elem) => {
                const link = $(elem).attr().onclick;
                const name = $(elem).text();
                const server = {
                  link: url(link),
                  name: name.normalize(),
                };
                servers.push(server);
              });
          }
          resolve(servers);
        } catch (err) {
          resolve(null);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function saveServerEpisodios() {
  const filter = {conclude: false, servers: []};
  const episodios = await Episodio.find(filter).sort({serie: 1}).limit(25);

  if (episodios.length > 0) {
    await Promise.all(
      episodios.map(async (episodio) => {
        const urlSerie = episodio.uri;
        const linkIframe = await getLinkIframe(urlSerie);
        const servers = await getServers(linkIframe);
        if (servers) {
          episodio.conclude = true;
          episodio.servers = servers;
          console.log(
            `SERIE: ${episodio.serie} - ${episodio.temporada} - ${episodio.title}`
          );
          // console.log(episodio._id, episodio.description);
          await episodio.save();
        }
      })
    );
    await saveServerEpisodios();
  }
  return null;
}

export async function searchPages(urlPage) {
  const allPages = [];
  let linkPage = urlPage;
  allPages.push(linkPage);
  do {
    linkPage = await linkNextPage(linkPage);
    linkPage && allPages.push(linkPage);
  } while (linkPage);
  return allPages;
}

export async function searchSeries(urlPage) {
  console.log(`GETTING PAGES`);
  const allPages = await searchPages(urlPage);

  console.log(`CREATING SERIES\n`);
  await Promise.all(
    allPages.map(async (url) => {
      const series = await getSeries(url);

      console.log(`CREATING ${series.length} SERIES\n`);
      Serie.create(series);
    })
  );
}
