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
        this.name = name;
        this.id = 0;
        this.country = '';
        this.pressure = 0;
        this.humidity = 0;
        this.temp = 0;
        ListWeathers.add(this);
        
        WeaView.update(ListWeathers.itens);

        this.__api = new ApiService();
        this.__weatherService = new WeatherService();
        this.__cacheService = new CacheService();
        this.getInitialData();

        this.__timer = setInterval( () => {
            this.updateData();
        },600000);
    }

    /** 
     * Get with initials Data
    */
    private getInitialData(){
        this.__weatherService.addSpinner(this);
        if(localStorage[`WEA${this.name.replace(/\s+/g,'')}`] == undefined){
            console.info("Gets data in the API");
            this.__api.get(`weather?q=${this.name}`, (x)=>{
                let r = JSON.parse(x);
                if(r.cod == 200){
                    this.id = r.id;
                    this.country = `, ${r.sys.country}`;
                }
                this.buildData(r); 
                this.__cacheService.add(r);
            });
        }else{
            console.info("Gets data in the Cached");
            let cacheValue = this.__cacheService.getData(this);
            this.buildData(cacheValue); 
        }
    }

    /** 
     * Update Data Weather
    */
    private updateData(){
        this.__weatherService.addSpinner(this);    
        this.__api.get(`weather?q=${this.name}`, (x)=>{
            let r = JSON.parse(x);
            this.buildData(r);
            this.__cacheService.update(this);
        });
        
    }

    /**
     * Builds the weather data with the coming API response
     * @param r 
     */
    private buildData(r){
        if(parseInt(r.cod) == 200){
            this.pressure = r.main.pressure;
            this.humidity = r.main.humidity;
            this.temp = this.__weatherService.convertKelvinToCelcius(r.main.temp);
            this.dateUpdate = this.__weatherService.setdateUpdate();
            this.cssClassTemp = this.__weatherService.appliesCssClassTemp(this.temp);

        }else if(parseInt(r.cod) == 404){
            this.cssClassStatus = CLASS_WEA_ERROR;
            clearInterval(this.__timer);
            this.__cacheService.remove(this);
            
            // this.__timer = setTimeout( ()=> {
            //     ListWeathers.remove(this.name);
            //     WeaView.update(ListWeathers.itens);
            // },5000);
        }
        ListWeathers.update(this.name,this);
        this.__weatherService.removeSpinner(this);
    }
}
  