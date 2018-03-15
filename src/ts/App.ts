import { WeatherController } from './Constrollers/Weather.controller';
import { ListWeathers } from './Models/ListWeathers.model';

let weaController = new WeatherController();
let $ = document.querySelector.bind(document);

$('#formAdd').onsubmit = (ev)=>{
    ev.preventDefault();
    var textField = $('input[name=textField]');
    weaController.create(textField.value,true);
    textField.value = '';
};

