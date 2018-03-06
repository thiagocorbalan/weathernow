import { CLASS_WEA_ACTIVE, CLASS_WEA_SPINNER } from '../Helpers/Constants';
import { WeatherModel } from '../Models/Weather.model';
import { ListWeathers } from '../Models/listWeathers.model';
import { WeatherResultModel } from '../Models/WeatherResult.model';
import { ApiInterface } from '../Services/api.interface';
import { ApiService } from '../Services/api.service';

export abstract class WeaView{
    
    private static __api: ApiInterface = new ApiService();
    private static __weatherService: WeatherService = new WeatherService();
    private static __container:HTMLElement =  document.querySelector('#weaContainer');

    /**
     * Create the wether template
     * @param model 
     */
    public static template(model){
        return model.map((n:WeatherResultModel)=>{
            console.log(n);
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
        
        WeaView.calculateWidthContainer(model);
        WeaView.applyClicks(model);
        WeaView.applyClickTryAgain(model);

    }

    public static calculateWidthContainer(model){
        if(model.length >= 6 ){
            let widthContainer = model.length * 300;
            WeaView.__container.style.width = `${widthContainer}px`;
            WeaView.__container.style.position = 'absolute';
            window.scrollTo(widthContainer,0);
        }
    }

    public static applyClicks(model){
        let itens = <Node[]><any>WeaView.__container.querySelectorAll('.wea-card');

        itens.forEach(element =>  element.addEventListener('click', () => {
            const el = (<HTMLElement>element).classList;
            const classCssActive = 'wea-card--status-active';
        
            if(!el.contains(classCssActive)){
                el.add(classCssActive);
            }else{
                el.remove(classCssActive);
            }
        }));
    }

    public static applyClickTryAgain(model){
        let itens = <Node[]><any>WeaView.__container.querySelectorAll('.wea-card');


        itens.forEach(element =>{

            const el = (<HTMLDivElement>element);
            const button = el.querySelector('.wea-card__error button.btn');

            button.addEventListener('click', (event:Event) => {
                const srcElement = (<HTMLDivElement>event.srcElement)
                const keyCache = srcElement.getAttribute('data-key');
                const name = srcElement.getAttribute('data-name');

                // Add spinner
                el.classList.add(CLASS_WEA_SPINNER);
                
                // GET Api
                WeaView.__api.get(`weather?q=${name}`,(result)=>{                    
                    let r:WeatherResultModel = JSON.parse(result);
                    r.main.temp = this.__weatherService.convertKelvinToCelcius(r.main.temp);
                    r.cssClassTemp = this.__weatherService.appliesCssClassTemp(r.main.temp);

                    ListWeathers.update(keyCache,JSON.parse(result));
                    
                    // Remove spinner
                    //el.classList.remove(CLASS_WEA_SPINNER);
                    WeaView.update(ListWeathers.itens);
                });
            });

        });
    }
}