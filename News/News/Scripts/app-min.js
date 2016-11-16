// JavaScript source code
const host = "https://newsapi.org/",
    apiVersion = "v1/",
    Sources = "sources/";

class URLS
{
    static get HOST() {
        return host;
    }

    static get API_VERSION() {
        return apiVersion;
    }

    static get SOURCES() {
        return Sources;
    }
};// Represents the news given by source
class News{
    constructor(source, sortBy, articles) {
        this.source = source;
        this.sortBy = sortBy;
        this.articles = articles;
    }
};// Represents the single news item.
class NewsItem {
    constructor(author, title, description, url, urlToImage, publishedAt) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
    }
};// Represents the source
class SourceItem {
    constructor(id, name, description, url, category, language, country, urlsToLogos, sortBysAvailable) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.category = category;
        this.language = language;
        this.country = country;
        this.urlsToLogos = urlsToLogos;
        this.sortBysAvailable = sortBysAvailable;
    }
};// The url to logos class
class UrlsToLogos {
    constructor(small, medium, large) {
        this.small = small;
        this.medium = medium;
        this.large = large;
    }
};// JavaScript source code
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
};// The source controller
class SourceController {
    constructor(sourceView, sourceService) {
        this._sourceService = sourceService;
        this._sourceView = sourceView;
    }

    loadSources() {
        return this._sourceService.getSources()
            .then((sourceItems) => {
                if (sourceItems) {
                    this.setSources(sourceItems);
                } else {
                    // TODO: move the alert message to constant.
                    alert("there is no source items");
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    setSources(sourceItems) {
        this._sourceView.drawSources(sourceItems);
    }
};// The sources view code behind
const sourceItemTemplate = sourceItem => `<div>${sourceItem.name}</div>`;

class SourcesView
{
    constructor() {
        this.sourcesListControl = document.getElementById("sourcesList");
    }

    drawSources(sourceItems) {
        for (let sourceItem of sourceItems) {
            let sourceItemElement = document.createElement("div");
            sourceItemElement.innerHTML = sourceItemTemplate(sourceItem);
            this.sourcesListControl.appendChild(sourceItemElement);
        }
    }
};(function() {
    let sourceController = new SourceController(new SourcesView(), new SourceService());
    sourceController.loadSources();
})();