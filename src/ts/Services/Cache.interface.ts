export interface CacheInterface{
    add(model);
    remove(model);
    update(model);
    getData(model);
    hasCache(key);
}