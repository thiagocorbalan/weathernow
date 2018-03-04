import { ListWeathers } from '../Models/listWeathers.model';
import { ApiService } from '../Services/api.service';
import { WeatherView } from '../Views/weather.view';
import { CitiesEnum } from './../Helpers/cities.enum';
import { Weather } from '../Models/weather';

export class WeatherController{

    private weaContainer:HTMLElement;
    private _listWeathers = new ListWeathers();
    private _weatherView: WeatherView;
    private api = new ApiService();

    constructor(){
        let $ = document.querySelector.bind(document);
        this.weaContainer = $('#weaContainer');

        this._weatherView = new WeatherView(this.weaContainer);

        // Atuliza sozinho
        this.api.get(`group?id=${CitiesEnum.Nuuk},${CitiesEnum.SaoPaulo},${CitiesEnum.Urubici},${CitiesEnum.Nairobi}&units=weather`,(x) => {
            JSON.parse(x).list.map( r => {
                this._listWeathers.setWeathers( new Weather(r.name, r.sys.country, r.main.temp, r.main.pressure, r.main.humidity) );
            });
            this._weatherView.update(this._listWeathers);
        });
        
    }
}
