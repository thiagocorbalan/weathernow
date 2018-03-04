import { WeatherModel } from "./weather.model";

export class ListWeathers{
    private _weathers: Array<WeatherModel>;

    constructor(){
        this._weathers = [];
    }

    setWeathers(weather:WeatherModel){
        this._weathers.push(weather);
    }

    getWeathers():Array<WeatherModel>{
        return this._weathers;
    }

    clear():void{
        this._weathers = [];
    }
}
