// Represents the news given by source
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
}