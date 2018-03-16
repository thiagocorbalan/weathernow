import { WeatherResultModel } from '../Models/WeatherResult.model';

export interface CacheInterface{
    add(key:string,model:WeatherResultModel);
    remove(key:string);
    update(model:WeatherResultModel);
    getData(key:string):WeatherResultModel;
    hasCache(key:string);
}