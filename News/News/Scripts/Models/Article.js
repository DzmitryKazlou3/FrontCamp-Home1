// Represents the single news item.
class Article {
    constructor(title, url, description, author, urlToImage, publishedAt) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
    }
}