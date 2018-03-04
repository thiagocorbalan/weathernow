export class Weather {
    public city:string;
    public country:string;
    public temp:number;
    public press:number;
    public hum:number;
    public dateUpdate:string;
    public cssClassTemp: string;
    public active: boolean;

    constructor(city,country,temp,press,hum){
        this.city = city;
        this.country = country;
        this.press = press;
        this.hum = hum;
        this.convertKelvinToCelcius(temp);
        this.convertdateUpdate();
        this.appliesCssClassTemp();
    }

    /**
     * Convert Kelkin To Celcius
     * @param temp 
     */
    private convertKelvinToCelcius(temp:number){
        this.temp = Math.round(temp - 273);
    }

    /**
     * Applies the css class of temperature
     */
    private appliesCssClassTemp(){
        
        let cssClassEnum = {
            HOT: 'wea-card__temp--status-hot',
            COLD: 'wea-card__temp--status-cold'
        }

        if(this.temp <=5){
            this.cssClassTemp = cssClassEnum.COLD;    
        }else if(this.temp > 25){
            this.cssClassTemp = cssClassEnum.HOT;
        }
    }

    /**
     * Convert Date Now format Hour:Minutes:Seconds
     */
    private convertdateUpdate(){
        let hour = new Date();
        this.dateUpdate = `${hour.getHours()}:${hour.getMinutes()}:${hour.getSeconds()}`;
    }
}
  