// JavaScript source code
const host = "https://newsapi.org/",
    apiVersion = "v1/",
    Sources = "sources/",
    ArticlesUrl = "/articles?source=";

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

    static get ARTICLES() {
        return ArticlesUrl;
    }
};class Observable{
    constructor() {
        this._observers = new Map();
    }

    addObserver(label, callback) {
        this._observers.has(label) || this._observers.set(label, []);
        this._observers.get(label).push(callback);
    }
    removeListener(label, callback) {
        let observers = this._observers.get(label);
        let index;

        if (observers && observers.length) {
            index = observers.reduce((i, observer, index) => {
                return (isFunction(observer) && observer === callback) ?
                    i = index :
                    i;
            }, -1);

            if (index > -1) {
                observers.splice(index, 1);
                this._observers.set(label, observers);
                return true;
            }
        }
        return false;
    }
    emit(label, ...args) {
        let observers = this._observers.get(label);
        if (observers && observers.length) {
            observers.forEach((observer) => {
                observer(...args);
            });
            return true;
        }
        return false;
    }
};// Represents the single news item.
class Article {
    constructor(title, url, description, author, urlToImage, publishedAt) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
    }
};// Represents the news given by source
class Articles{
    constructor(source, sortBy) {
        this.source = source;
        this.sortBy = sortBy;
        this._articles = [];
    }

    Add(article) {
        this._articles.push(article);
    }

    get Articles() {
        return this._articles;
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
};// The article service
class ArticlesService {
    constructor() {
    }

    getArticlesBySourceId(sourceId) {
        let headers = new Headers();
        headers.append("X-Api-Key", "caa2a0adb8424a32bb0a582406293aa1");
        let init = {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
        };
        return fetch(URLS.HOST + URLS.API_VERSION + URLS.ARTICLES + sourceId, init)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.statusText);
                }
            }).then(function (json) {
                let articlesModel = new Articles(json.source, json.sortBy);
                for (let article of json.articles) {
                    articlesModel.Add(new Article(article.title, article.url));
                }
                return articlesModel;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};class ArticlesPresenter {
    constructor(articlesView, articleService, observable) {
        observable.addObserver("sourceChanged", this.onSourceChanged.bind(this));
        this._articleService = articleService;
        this._articlesView = articlesView;
        this._articlesView.Presenter = this;
    }

    // called from observable, when "sourceChanged" is emited.
    onSourceChanged(newSourceId) {
        this.loadArticles(newSourceId);
    }

    loadArticles(sourceId) {
        this._articleService.getArticlesBySourceId(sourceId)
            .then(articlesModel => {
                this.setArticles(articlesModel.Articles);
            })
            .catch(err => alert(err));
    }

    setArticles(articles) {
        this._articlesView.showArticles(articles);
    }
};// The source Presenter
class SourcePresenter {
    constructor(sourceView, sourceService, observable) {
        this._observable = observable;
        this._sourceService = sourceService;
        this._sourceView = sourceView;
        this._sourceView.Presenter = this;
        this._selectedSourceId = null;
    }

    set SelectedSourceId(value) {
        if (this._selectedSourceId !== value) {
            this._selectedSourceId = value;
            this._observable.emit("sourceChanged", this._selectedSourceId);
        }
    }

    loadSources() {
        return this._sourceService.getSources()
            .then(sourceItems => {
                if (sourceItems) {
                    this.setSources(sourceItems);
                } else {
                    // TODO: move the alert message to constant.
                    alert("there is no source items");
                }
            }).catch(err => alert(err));
    }

    setSources(sourceItems) {
        this._sourceView.showSources(sourceItems);
    }
};class MainPresenter
{
    constructor()
    {
        this._observable = new Observable();
        this._sourcePresenter = new SourcePresenter(new SourcesView(), new SourceService(), this._observable);
        this._articlesPresenter = new ArticlesPresenter(new ArticlesView(), new ArticlesService(), this._observable);
    }

    initialize() {
        this._sourcePresenter.loadSources();
    }
};const articleItemTemplate = article => `<a href="${article.url}">${article.title}</a>`;
const sourceItemTemplate = sourceItem => `<div>${sourceItem.name}</div>`;

class Templates
{
    static get ArticleItemTemplate() {
        return articleItemTemplate;
    }

    static get SourceItemTemplate() {
        return sourceItemTemplate;
    }
};class View {
    constructor() {
        this._presenter = null;
        this._viewControl = document.getElementById("view");
    }

    set Presenter(value) {
        this._presenter = value;
    }

    clearView() {
        this._viewControl.innerHTML = "";
    }

};// The sources view code behind
class SourcesView extends View
{
    constructor() {
        super();
        this.handleEvent = function (event) {
            switch (event.type) {
                case 'click':
                    this.onSourceSelected(event);
                    break;
            }
        };
    }

    showSources(sourceItems) {
        super.clearView();
        let sourcesPanel = document.createElement("div");
        for (let sourceItem of sourceItems) {
            let sourceItemElement = document.createElement("div");
            sourceItemElement.innerHTML = Templates.SourceItemTemplate(sourceItem);
            sourceItemElement.setAttribute("data-source-id", sourceItem.id);
            sourceItemElement.addEventListener("click", this, false);
            sourcesPanel.appendChild(sourceItemElement);
        }
        this._viewControl.appendChild(sourcesPanel);
    }
    
    onSourceSelected(event) {
        event.preventDefault();
        let sender = event.currentTarget;
        if (this._presenter != null) {
            this._presenter.SelectedSourceId = sender.getAttribute("data-source-id");
        }
    }
};// The articles view.
class ArticlesView extends View
{
    constructor() {
        super();
    }

    showArticles(articles) {
        super.clearView();
        let articlesPanel = document.createElement("div");
        let backElement = document.createElement("div");
        backElement.innerHTML = `<a href="${window.location.href}">Back</div>`;
        articlesPanel.appendChild(backElement);
        for (let article of articles) {
            let articleItemElement = document.createElement("div");
            articleItemElement.innerHTML = Templates.ArticleItemTemplate(article);
            articlesPanel.appendChild(articleItemElement);
        }

        this._viewControl.appendChild(articlesPanel);
    }
};(function() {
    let mainPresenter = new MainPresenter();
    mainPresenter.initialize();
})();