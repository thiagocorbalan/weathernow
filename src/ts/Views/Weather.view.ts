import { WeatherResultModel } from '../Models/WeatherResult.model';

export abstract class WeaView{    
    public static __container:HTMLElement =  document.querySelector('#weaContainer');

    /**
     * Create the wether template
     * @param model 
     */
    public static template(model){
        return model.map((n:WeatherResultModel)=>{

            return `<div id="${n.id}" class="wea-card ${n.cssClassStatus} ${n.cssClassStatusError}" >
                <div class="wea-card__city-name">${n.name}${n.sys.country ? `, ${n.sys.country}` : ''}</div>
                <div class="wea-card__temp ${n.cssClassTemp}"> ${n.main.temp}<sup>º</sup></div>

                <div class="wea-card__data">
                    <div class="wea-card__data--humidity">
                        <div class="label">Humidity</div>
                        <div class="data">${n.main.humidity}<sub>%</sub></div>
                    </div>
                    <div class="wea-card__data--pressure">
                        <div class="label">Pressure</div>
                        <div class="data">${n.main.pressure}<sub>hPa</sub></div>
                    </div>
                </div>
                <div class="wea-card__updated"> Updated at ${new Date(n.dateUpdate).toLocaleTimeString('en-US')}</div>
                <div class="wea-card__error">
                    <span class="label">Something went wrong</span>
                    <button type="button" class="btn" data-key="${n.keyCache}" data-name="${n.name}">Try Again</button>
                </div>
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
