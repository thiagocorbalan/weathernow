import { CacheInterface } from "./Cache.interface";

export class CacheService implements CacheInterface{

    /**
     * Add data in the LocalStorage
     * @param model 
     */
    public add(model){
        localStorage.setItem(`WEA${this.removeWhiteSpaces(model.name)}`, JSON.stringify(model));
    }

    /**
     * Remove data in the LocalStorage
     * @param model 
     */
    public remove(model){
        localStorage.removeItem(`WEA${this.removeWhiteSpaces(model.name)}`);
    }

    /**
     * Update data in the LocalStorage
     * @param model 
     */
    public update(model){
        localStorage[`WEA${this.removeWhiteSpaces(model.name)}`] = model;
    }

    /**
     * Get Data in the Local Storage
     * @param model 
     */
    public getData(model){
        return JSON.parse(localStorage[`WEA${this.removeWhiteSpaces(model.name)}`]);
    }

    /**
     * Remove White Spaces
     * @param text 
     */
    private removeWhiteSpaces(text:string){
        return text.replace(/\s+/g,'');
    }

}