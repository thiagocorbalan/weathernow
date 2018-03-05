import { CLASS_WEA_ERROR } from '../Helpers/Constants';
import { WeatherInterface } from '../Services/Weather.interface';
import { WeatherService } from '../Services/Weather.service';
import { ApiService } from './../Services/api.service';
import { WeaView } from './../Views/Weather.view';
import { ListWeathers } from './listWeathers.model';
import { CacheService } from '../Services/Cache.service';
import { CacheInterface } from '../Services/Cache.interface';

export class Weather {
    public id: number;
    public name:string;
    public country:string;
    public temp:number;
    public pressure:number;
    public humidity:number;
    public dateUpdate:string;    
    public cssClassTemp: string;
    public cssClassStatus:string;
    private __api:ApiService;
    private __timer:any;
    private __weatherService:WeatherInterface;
    private __cacheService:CacheInterface;

    constructor(name){
        this.__api = new ApiService();
        this.__weatherService = new WeatherService();
        this.__cacheService = new CacheService();

        this.name = name;

        if(this.__cacheService.hasCache(this)){
            this.getCache();
        }else{
            this.getApi();
        }

        //if(this.__cacheService.getItem())
        //console.log('this.name===>',this);
        //console.log(!this.__cacheService.getData(this) && this.__cacheService.getData(this).name != this.name);

        // if(!this.__cacheService.getData(this) && this.__cacheService.getData(this).name != this.name){            
        //     ListWeathers.add(this);
        //     WeaView.update(ListWeathers.itens);
        // }
        
        // this.getInitialData();
        
        // this.__timer = setInterval( () => {
        //     this.updateData();
        // },600000);
    }

    private getApi(){
        console.log('%cGET_API','font-weight:600;color:purple;');
        this.__api.get(`weather?q=${this.name}`, (result)=>{
            
            let r = JSON.parse(result);

            if(r.cod == 200){
                this.id = r.id;
                this.country = r.sys.country;
                this.buildWeather(r);
                this.__cacheService.add(r);
            }
            else if( parseInt(r.cod)== 404)
            {
                this.__weatherService.addMessageError(this);
            }
        });
    }

    private getCache(){
        console.log('%cGET_CACHE','font-weight:600;color:blue;');
        let cache = this.__cacheService.getData(this);
        this.id = cache.id;
        this.country = cache.sys.country;
        this.buildWeather(cache);
    }


    /** 
     * Update Data Weather
    */
    // private updateData(){
    //     this.__weatherService.addSpinner(this);    
    //     this.__api.get(`weather?q=${this.name}`, (x)=>{
    //         let r = JSON.parse(x);
    //         this.buildData(r);
    //         this.__cacheService.update(this);
    //     });
        
    // }

    /**
     * Builds the weather
     * @param r 
     */
    private buildWeather(data){
        this.pressure = data.main.pressure;
        this.humidity = data.main.humidity;
        this.temp = this.__weatherService.convertKelvinToCelcius(data.main.temp);
        //this.dateUpdate = this.__weatherService.setdateUpdate();
        this.cssClassTemp = this.__weatherService.appliesCssClassTemp(this.temp);
        //ListWeathers.update(this.name,this);

        ListWeathers.add(this);
        WeaView.update(ListWeathers.itens);
    }
}
  