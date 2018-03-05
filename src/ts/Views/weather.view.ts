import { CLASS_WEA_ACTIVE } from '../Helpers/Constants';
import { WeatherModel } from '../Models/Weather.model';
import { ListWeathers } from '../Models/listWeathers.model';

export abstract class WeaView{
    private static __container:HTMLElement =  document.querySelector('#weaContainer');

    /**
     * Create the wether template
     * @param model 
     */
    public static template(model){

        //console.log('template',model);

        return model.map((n:WeatherModel)=>{
            return `<div id="${n.id}" class="wea-card ${n.cssClassStatus}" >
                <div class="wea-card__city-name">${n.name}${n.country ? `, ${n.country}` : ''}</div>
                <div class="wea-card__temp ${n.cssClassTemp}"> ${n.temp}<sup>º</sup></div>

                <div class="wea-card__data">
                    <div class="wea-card__data--humidity">
                        <div class="label">Humidity</div>
                        <div class="data">${n.humidity}<sub>%</sub></div>
                    </div>
                    <div class="wea-card__data--pressure">
                        <div class="label">Pressure</div>
                        <div class="data">${n.pressure}<sub>hPa</sub></div>
                    </div>
                </div>
                <div class="wea-card__updated"> Updated at ${n.dateUpdate} </div>
                
            </div>`
        }).join('');
    }

    /**
     * Update View with list
     * @param model 
     */
    public static update(model){
        WeaView.__container.innerHTML = WeaView.template(model);
    }
}