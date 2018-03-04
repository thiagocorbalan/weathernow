import { WeatherModel } from '../Models/weather.model';

export class WeatherView{
    private __container:HTMLElement;

    constructor(container){
        this.__container = container;
    }

    template(model){
        return model._weathers.map((n:WeatherModel)=>{            
            return `<div class="wea-card wea-card--status-active">
                <div class="wea-card__city-name">${n.city}, ${n.country}</div>
                <div class="wea-card__temp ${n.cssClassTemp}"> ${n.temp}<sup>º</sup></div>

                <div class="wea-card__data">
                    <div class="wea-card__data--humidity">
                        <div class="label">Humidit</div>
                        <div class="data">${n.hum}<sub>%</sub></div>
                    </div>
                    <div class="wea-card__data--pressure">
                        <div class="label">Pressure</div>
                        <div class="data">${n.press}<sub>hpa</sub></div>
                    </div>
                </div>
                <div class="wea-card__updated"> Updated at ${n.dateUpdate} </div>
                
            </div>`
        }).join('');
    }

    public update(model){
        this.__container.innerHTML = this.template(model);
    }


    
}