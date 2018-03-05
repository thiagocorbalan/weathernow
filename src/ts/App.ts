import { WeatherController } from './Constrollers/weather.controller';
import { ListWeathers } from './Models/listWeathers.model';

let weaController = new WeatherController();
let $ = document.querySelector.bind(document);

$('#formAdd').onsubmit = (ev)=>{
    ev.preventDefault();
    var textField = $('input[name=textField]');
    weaController.create(textField.value);
    textField.value = '';
};