import { CLASS_TEMP_COLD, CLASS_TEMP_HOT, CLASS_WEA_ERROR, CLASS_WEA_SPINNER } from './../Helpers/Constants';
import { ListWeathers } from './../Models/ListWeathers.model';
import { WeatherResultModel } from './../Models/WeatherResult.model';
import { WeaView } from './../Views/Weather.view';
import { WeatherInterface } from './Weather.interface';
import { DomWeatherController } from '../Constrollers/DomWeather.controller';

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
        }else{
            return '';
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
    public addSpinner(model:WeatherResultModel){
        model.cssClassStatus = CLASS_WEA_SPINNER;
        this.update(ListWeathers.itens);
    }

    /** 
     * Remove Spinner
    */
    public removeSpinner(model:WeatherResultModel){
        model.cssClassStatus = '';
        this.update(ListWeathers.itens);
    }

    /**
     * 
     * @param model 
     */
    public addMessageError(model:WeatherResultModel){
        model.cssClassStatusError = CLASS_WEA_ERROR;
        this.update(ListWeathers.itens);
    }

    /**
     * 
     * @param model 
     */
    public removeMessageError(model:WeatherResultModel){
        model.cssClassStatusError = '';
        this.update(ListWeathers.itens);
    }

    public update(model: Array<WeatherResultModel>){
        WeaView.update(model);
        DomWeatherController.calculateWidthContainer(model);
        DomWeatherController.applyClicks(model);
        DomWeatherController.applyClickTryAgain(model);

    }
}
