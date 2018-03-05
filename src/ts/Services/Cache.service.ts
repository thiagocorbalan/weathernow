import { CacheInterface } from "./Cache.interface";

export class CacheService implements CacheInterface{

    /**
     * Add data in the LocalStorage
     * @param model 
     */
    public add(model){
        localStorage.setItem(this.buildKeyCache(model), JSON.stringify(model));
    }

    /**
     * Remove data in the LocalStorage
     * @param model 
     */
    public remove(model){
        localStorage.removeItem(this.buildKeyCache(model));
    }

    /**
     * Update data in the LocalStorage
     * @param model 
     */
    public update(model){
        localStorage[this.buildKeyCache(model)] = model;
    }

    /**
     * Get Data in the Local Storage
     * @param model 
     */
    public getData(model){
        let itemCache = localStorage[this.buildKeyCache( model )];
        return  itemCache ? JSON.parse(itemCache) : null;
    }

    public getDataItem(key:string){
        return JSON.parse(localStorage[this.buildKeyCache(key)]);
    }

    public hasCache(key:string):boolean{
        return localStorage[this.buildKeyCache(key)] != undefined;
    }

    /**
     * Remove White Spaces
     * @param text 
     */
    private buildKeyCache(model){
        return `WEA${model.name.toLowerCase().replace(/\s+/,'') }`;
    }
    

}