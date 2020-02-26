import CatalogService from "../services/catalog";

const catalogService = new CatalogService();

const catalogsLoaded = (newCatalogs) => {
    return {
        type: 'CATALOGS_LOADED',
        payload: newCatalogs
    }
}

export {
    catalogsLoaded
}