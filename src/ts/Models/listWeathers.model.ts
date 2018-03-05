import { WeatherModel } from './Weather.model';
import { CacheService } from '../Services/Cache.service';

export abstract class ListWeathers{
    static itens: Array<WeatherModel> = [];

    constructor(){
        ListWeathers.itens = [];
    }

    public static add(weather:WeatherModel){
        ListWeathers.itens.push(weather);
    }

    public static remove(name:string){
        let index = ListWeathers.find(name);
        ListWeathers.itens.splice(index,1);
    }

    public static update(name, data){
        ListWeathers.itens[ListWeathers.find(name)] = data;
    }

    public static clear():void{
        ListWeathers.itens = [];
    }

    public static find(name:string):number{
        return ListWeathers.itens.map(x=>x.name).indexOf(name);
    }

    public static contains(model):boolean{
        const __cacheService = new CacheService();
        return __cacheService.getData(model) && ListWeathers.find(__cacheService.getData(model).name) < 0;

    }
}
