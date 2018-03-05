import { WeatherModel } from "../Models/Weather.model";

export interface WeatherInterface{
    convertKelvinToCelcius(temp:number):number;
    appliesCssClassTemp(temp):string;
    setdateUpdate():string;
    removeSpinner(model:WeatherModel):void;
    addSpinner(model:WeatherModel):void;
    addMessageError(model:WeatherModel):void;
    removeMessageError(model:WeatherModel):void;
}