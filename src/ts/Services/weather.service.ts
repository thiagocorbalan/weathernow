import { CLASS_TEMP_HOT, CLASS_TEMP_COLD, CLASS_WEA_SPINNER } from "../Helpers/Constants";
import { WeaView } from "../Views/Weather.view";
import { ListWeathers } from "../Models/listWeathers.model";
import { WeatherModel } from "../Models/Weather.model";
import { WeatherInterface } from "./Weather.interface";

export class WeatherService implements WeatherInterface{

    /**
     * Convert Kelkin To Celcius
     * @param temp 
     */
    public convertKelvinToCelcius(temp:number):number{
        return Math.round(temp - 273);
    }

    /**
     * Applies the css class of temperature
     */
    public appliesCssClassTemp(temp):string{
        if(temp <=5){
            return CLASS_TEMP_COLD;    
        }else if(temp > 25){
            return CLASS_TEMP_HOT;
        }
    }

    /**
     * Convert Date Now format Hour:Minutes:Seconds
     */
    public setdateUpdate():string{
        return new Date().toLocaleTimeString('en-US');
    }

    /** 
     * Add Spinner
    */
    public addSpinner(model:WeatherModel):void{
        model.cssClassStatus = CLASS_WEA_SPINNER;
        WeaView.update(ListWeathers.itens);
    }

    /** 
     * Remove Spinner
    */
    public removeSpinner(model:WeatherModel):void{
        model.cssClassStatus = '';
        WeaView.update(ListWeathers.itens);
    }
}