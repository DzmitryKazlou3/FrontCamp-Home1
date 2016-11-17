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
}