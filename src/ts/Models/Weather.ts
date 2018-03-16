import { TextHelper } from '../Helpers/TextHelper';
import { WeatherInterface } from '../Services/Weather.interface';
import { TIME_UPDATE_WEATHER, DEBUG_CONTROL } from './../Helpers/Constants';
import { ApiService } from './../Services/Api.service';
import { CacheInterface } from './../Services/Cache.interface';
import { CacheService } from './../Services/Cache.service';
import { WeaView } from './../Views/Weather.view';
import { ListWeathers } from './ListWeathers.model';
import { SysModel } from './Sys.Model';
import { TempModel } from './Temp.model';
import { WeatherResultModel } from './WeatherResult.model';
import { WeatherService } from '../Services/Weather.service';

export class Weather extends WeatherResultModel {
    public id: number;
    public name:string;
    public sys:SysModel;
    public main:TempModel;
    private __api:ApiService;
    private __timer:any;
    private __weatherService:WeatherInterface;
    private __cacheService:CacheInterface;

    constructor(name, event:boolean = false){
        super();

        this.sys = new SysModel();
        this.main = new TempModel();
        this.__api = new ApiService();
        this.__cacheService = new CacheService();
        this.__weatherService = new WeatherService();

        this.name = name;
        this.keyCache = `WEA${TextHelper.normalize(name)}`;
        this.cssClassStatus = '';
        this.cssClassTemp = '';
        this.cssClassStatusError = '';
        
        if(ListWeathers.find(this.keyCache) < 0){
            if(this.__cacheService.hasCache(this.keyCache)){
                this.getCache();
            }else{
                this.getApi();
            }
        }else if(event){
            alert(`This city is already added! Please type a new another city.`);
        }
    }

    private getApi(){
        if(DEBUG_CONTROL){
            console.log('%cGET_API','font-weight:600;color:purple;');
        }
        
        this.__api.get(`weather?q=${this.name}`, (result)=>{            
            let r:WeatherResultModel = JSON.parse(result);
            if(r.cod == 200){
                this.id = r.id;
                this.sys.country = r.sys.country;
                this.name = r.name;
                this.dateUpdate = new Date().toString();
                this.buildWeather(r);
                this.__cacheService.add(this.keyCache,r);
            }
            else if( parseInt(<string>r.cod)== 404)
            {
                this.__weatherService.addMessageError(this);
            }
        });
    }

    private getCache(){
        if(DEBUG_CONTROL){
            console.log('%cGET_CACHE','font-weight:600;color:blue;');
        }
        let cache = this.__cacheService.getData(this.keyCache);
        this.id = cache.id;
        this.name = cache.name;
        this.sys.country = cache.sys.country;
        this.dateUpdate = new Date(cache.dateUpdate).toString();
        this.buildWeather(cache);
    }


    /** 
     * Update Data Weather
    */
    public updateData(){
        this.__weatherService.addSpinner(this);

        setTimeout(() => {
            this.__api.get(`weather?q=${this.name}`, (result)=>{
                let r:WeatherResultModel = JSON.parse(result);
                if(r.cod == 200){
                    if(DEBUG_CONTROL){
                        console.log('%cUPDATE ITEM -> GET_API','font-weight:600;color:purple;');
                    }


                    this.buildWeather(r,true);
                    r.keyCache = this.keyCache;
                    this.__cacheService.update(this);
                }
                else if( parseInt(<string>r.cod)== 404)
                {
                    this.__weatherService.addMessageError(this);
                    clearInterval(this.__timer);
                }
                
                ListWeathers.update(this.keyCache,this);
                this.__weatherService.removeSpinner(this);
            });
        },1000);
        
        
    }

    /**
     * Builds the weather
     * @param r 
     */
    private buildWeather(data,update?){
        this.main.pressure = data.main.pressure;
        this.main.humidity = data.main.humidity;
        this.main.temp = this.__weatherService.convertKelvinToCelcius(data.main.temp);
        this.cssClassTemp = this.__weatherService.appliesCssClassTemp(this.main.temp);

        if(!update){
            ListWeathers.add(this);
            this.__weatherService.update(ListWeathers.itens);
            this.__timer = setInterval( () => this.updateData() ,TIME_UPDATE_WEATHER );
        }
    }
}
  
