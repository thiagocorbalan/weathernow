import { Weather } from '../Models/Weather';
import { ListWeathers } from './../Models/ListWeathers.model';
import { CacheService } from './../Services/Cache.service';

export class WeatherController{
    private __cacheService = new CacheService();

    constructor(){
        let urb = this.create('Urubici');
        let nuk = this.create('Nuuk');
        let nai = this.create('Nairobi');

        this.createWeatherCache();
    }

    public create(name, active?:boolean){
        return new Weather(name,active);
    }

    private createWeatherCache(){
        Object.keys(localStorage).forEach((key) => {            
            const dataModel = JSON.parse(localStorage[key]);
            if(dataModel && ListWeathers.contains(dataModel)){
                this.create(dataModel.name);
            }
        });
    }
}
