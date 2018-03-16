import { TIME_EXPIRE_CACHE } from './../Helpers/Constants';
import { WeatherResultModel } from './../Models/WeatherResult.model';
import { CacheInterface } from './Cache.interface';

export class CacheService implements CacheInterface{

    /**
     * Add data in the LocalStorage
     * @param model 
     */
    public add(key:string,model:WeatherResultModel){
        var dateTime = new Date();
        model.dateExpire = dateTime.setMinutes(dateTime.getMinutes()+TIME_EXPIRE_CACHE); //TIME_EXPIRE
        model.dateUpdate = new Date().toString();
        model.keyCache = key;
        localStorage.setItem(key, JSON.stringify(model));
    }

    /**
     * Remove data in the LocalStorage
     * @param model 
     */
    public remove(key:string){
        localStorage.removeItem(key);
    }

    /**
     * Update data in the LocalStorage
     * @param model 
     */
    public update(model:WeatherResultModel){
        localStorage[model.keyCache] = JSON.stringify(model);
    }

    /**
     * Get Data in the Local Storage
     * @param model 
     */
    public getData(key:string){
        const itemCache = localStorage[key];
        return  itemCache ? JSON.parse(itemCache) : null;
    }

    public getDataItem(key:string){
        return JSON.parse(localStorage[key]);
    }

    public hasCache(key:string):boolean{
        const itemCache = localStorage[key];
        if(itemCache){
            return (<WeatherResultModel>JSON.parse(itemCache)).dateExpire >= new Date().getTime();
        }else{
            return false;
        }
    }
}