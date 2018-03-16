import { WeatherController } from './Constrollers/Weather.controller';
import { DomWeatherController } from './Constrollers/DomWeather.controller';
import { ListWeathers } from './Models/ListWeathers.model';

class App {
    private weaController;
    private divHeaderHeight;
    private divFormAdd;
    private divFormAddHeight;
    private divMainContent;
    private selectElement;
    
    constructor(){
        this.selectElement = document.querySelector.bind(document);

        this.divFormAdd = this.selectElement('#formAdd');
        this.divHeaderHeight = (<HTMLElement>this.selectElement('header.main-header')).clientHeight;
        this.divFormAddHeight = (<HTMLElement>this.selectElement('#formAdd')).clientHeight;
        this.divMainContent = <HTMLElement>this.selectElement('.main-content');

        this.weaController = new WeatherController();

        window.addEventListener('resize', (e) => {            
            DomWeatherController.calculateWidthContainer(ListWeathers.itens);
            this.calcDivMainContent();
        });
        
    }

    
    private startFormAdd(){
        this.divFormAdd.onsubmit = (ev)=>{
            ev.preventDefault();
            var textField = this.selectElement('input[name=textField]');
            if(textField.value != ''){
                this.weaController.create(textField.value,true);
                textField.value = '';
            }else{
                alert('OPS! Type a city...');
                textField.focus();
            }
        };

    }

    private calcDivMainContent(){
        this.divMainContent.style.minHeight = `${window.innerHeight - (this.divHeaderHeight + this.divFormAddHeight)}px`;
    }
}

let app = new App();
    
    
    