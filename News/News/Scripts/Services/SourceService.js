// JavaScript source code
class SourceService {
    constructor() {
        this._sources = [];
    }

    getSources() {
        if (this._sources.length > 0) {
            return Promise.resolve(this._sources);
        }

        return fetch(URLS.HOST + URLS.API_VERSION + URLS.SOURCES)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.statusText);
                }
            }).then(json => {
                for (let source of json.sources) {
                    // id, name, description, url, category, language, country, urlsToLogos, sortBysAvailable
                    this._sources.push(
                        new SourceItem(
                        source.id,
                        source.name,
                        source.description,
                        source.url,
                        source.category,
                        source.language,
                        source.contry,
                        source.urlsToLogos,
                        source.sortBysAvailable));
                }

                return this._sources;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}