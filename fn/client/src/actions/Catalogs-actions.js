const catalogsLoaded = newCatalogs => ({
    type: 'CATALOGS_LOADED',
    payload: newCatalogs,
});

const catalogLoaded = newCatalog => ({
    type: 'CATALOG_LOADED',
    payload: newCatalog,
});

export { 
    catalogsLoaded,
    catalogLoaded
 };
