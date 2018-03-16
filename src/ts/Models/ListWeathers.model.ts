import { CacheService } from '../Services/Cache.service';
import { WeatherResultModel } from './WeatherResult.model';

export abstract class ListWeathers{
    static itens: Array<WeatherResultModel> = [];

    constructor(){
        ListWeathers.itens = [];
    }

    public static add(weather:WeatherResultModel){
        ListWeathers.itens.push(weather);
    }

    public static remove(key:string){
        let index = ListWeathers.find(key);
        ListWeathers.itens.splice(index,1);
    }

    public static update(key:string, model:WeatherResultModel){
        ListWeathers.itens[ListWeathers.find(key)] = model;
    }

    public static clear():void{
        ListWeathers.itens = [];
    }

    public static find(key:string):number{
        return ListWeathers.itens.map(res=>res.keyCache).indexOf(key);
    }

    public static contains(model:WeatherResultModel):boolean{
        const __cacheService = new CacheService();
        const __getData = __cacheService.getData(model.keyCache);
        return __getData && ListWeathers.find(__getData.name) < 0;
    }
}
