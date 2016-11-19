const articleItemTemplate = article =>
    `<a href="${article.url}">
        <div class ="item-container">
            <div class ="article-image"><img class ="image-fit" src="${article.urlToImage}"></div>
            <div class ="article-text-area">
                <div class="article-item-header">${article.title}</div>
                <div class ="article-item-description">${article.description}</div>
            </div>
        </div>
     </a>`;

const sourceItemTemplate = sourceItem =>
    `<div class="item-container">
        <div class ="source-image wide"><img class ="image-fit" src="${sourceItem.urlsToLogos.medium}"></div>
        <div class="source-item-class">${sourceItem.name}</div>
     </div>`;

class Templates
{
    static get ArticleItemTemplate() {
        return articleItemTemplate;
    }

    static get SourceItemTemplate() {
        return sourceItemTemplate;
    }
}