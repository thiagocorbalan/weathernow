import { Weather } from '../Models/Weather';
import { WeaView } from '../Views/Weather.view';

export class WeatherController{

    private _weaContainer:HTMLElement;

    constructor(){
        let urb = this.create('Urubici');
        let nuk = this.create('Nuuk');
        let nai = this.create('Nairobi');
    }

    public create(name, active?:boolean){
        return new Weather(name);
    }
}
