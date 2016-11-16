// JavaScript source code
class SourceService {
    constructor() {
    }

    getSources() {
        return fetch(URLS.HOST + URLS.API_VERSION + URLS.SOURCES)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.statusText);
                }
            }).then(function(json) {
                let sourceItems = [];
                for (let source of json.sources) {
                    // id, name, description, url, category, language, country, urlsToLogos, sortBysAvailable
                    sourceItems.push(new SourceItem(source.id, source.name));
                }

                return sourceItems;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}