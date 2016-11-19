const articleItemTemplate = article => `<a href="${article.url}">${article.title}</a>`;
const sourceItemTemplate = sourceItem => `<div>${sourceItem.name}</div>`;

class Templates
{
    static get ArticleItemTemplate() {
        return articleItemTemplate;
    }

    static get SourceItemTemplate() {
        return sourceItemTemplate;
    }
}