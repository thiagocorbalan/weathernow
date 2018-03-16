import { CloudsModel } from './Clouds.Model';
import { CoordModel } from './Coord.Model';
import { SysModel } from './Sys.Model';
import { TempModel } from './Temp.model';

export class WeatherResultModel{
    cod:(number|string);
    id:number;
    dt:number;
    name:string;
    base: string;
    coord: CoordModel;
    clouds: CloudsModel;
    visibility: string;
    weather: [ {description:string; icon:string; id:number; main:string;} ];
    wind:{ speed:number };
    main:TempModel;
    sys: SysModel;
    dateExpire: number;
    dateUpdate: string;
    keyCache:string;
    cssClassStatus: string;
    cssClassStatusError: string;
    cssClassTemp: string;
}