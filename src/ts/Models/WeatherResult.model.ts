import { TempModel } from "./Temp.model";
import { CoordModel } from "./Coord.Model";
import { WeatherModel } from "./weather.model";
import { SysModel } from "./Sys.Model";
import { CloudsModel } from "./Clouds.Model";

export class WeatherResultModel{
    cod:number;
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
}