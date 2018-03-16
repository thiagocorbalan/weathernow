import { WeaView } from "../Views/Weather.view";
import { CLASS_WEA_SPINNER, DEBUG_CONTROL } from "../Helpers/Constants";
import { WeatherResultModel } from "../Models/WeatherResult.model";
import { ListWeathers } from "../Models/ListWeathers.model";
import { ApiInterface } from "../Services/Api.interface";
import { ApiService } from "../Services/Api.service";
import { WeatherInterface } from "../Services/Weather.interface";
import { CacheInterface } from "../Services/Cache.interface";
import { CacheService } from "../Services/Cache.service";
import { WeatherService } from "../Services/Weather.service";

export abstract class DomWeatherController {

    private static __api:ApiInterface = new ApiService();
    private static __weatherService:WeatherInterface;
    private static __cacheService:CacheInterface = new CacheService();
    
    /**
     * Calc Width container
     * @param model 
     */
    public static calculateWidthContainer(model){

        let mainContent = <HTMLElement>document.querySelector('.main-content');
        let weaCard = (<HTMLDivElement>WeaView.__container.querySelector('.wea-card'));
        let computedStyle = window.getComputedStyle(weaCard, null);
        let weaCardWidth = weaCard.clientWidth + parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight);

        if(model.length >= 6 ){
            let widthContainer = model.length * weaCardWidth;
            WeaView.__container.style.width = `${widthContainer}px`;
            WeaView.__container.style.position = 'absolute';
            mainContent.scrollTo(widthContainer,0);
        }

        if((weaCardWidth * model.length) > window.innerWidth ){
            if(mainContent){

                if(window.innerWidth > 770 ){
                    mainContent.addEventListener('mousewheel', (e)=>{
                        e.preventDefault();
                        mainContent.scrollLeft += e.deltaY / model.length;
                    });
                }
                mainContent.style.justifyContent = 'left';
            }
        }else{
            mainContent.style.justifyContent = 'center';
        }

        if(DEBUG_CONTROL){
            console.log('DomWeatherController.calculateWidthContainer:',model);
        }
    }

    /**
     * Apply clicks open/close more info
     * @param model 
     */
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

        if(DEBUG_CONTROL){
            console.log('DomWeatherController.applyClicks:',model);
        }
    }

    /**
     * Apply Click Try Again
     * @param model 
     */
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
                DomWeatherController.__api.get(`weather?q=${name}`,(result)=>{                    
                    let r:WeatherResultModel = JSON.parse(result);
                    r.main.temp = this.__weatherService.convertKelvinToCelcius(r.main.temp);
                    r.cssClassTemp = this.__weatherService.appliesCssClassTemp(r.main.temp);
                    r.dateUpdate = new Date().toString();

                    ListWeathers.update(keyCache,r);
                    DomWeatherController.__cacheService.add(keyCache,r);
                    
                    WeaView.update(ListWeathers.itens);
                });
            });

        });

        if(DEBUG_CONTROL){
            console.log('DomWeatherController.applyClickTryAgain:',model);
        }
    }

}