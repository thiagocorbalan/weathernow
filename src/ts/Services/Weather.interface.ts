import { WeatherResultModel } from '../Models/WeatherResult.model';

export interface WeatherInterface{
    convertKelvinToCelcius(temp:number):number;
    appliesCssClassTemp(temp:number):string;
    setdateUpdate():string;
    removeSpinner(model:WeatherResultModel):void;
    addSpinner(model:WeatherResultModel):void;
    addMessageError(model:WeatherResultModel):void;
    removeMessageError(model:WeatherResultModel):void;
}