import { API_APPID, API_BASE_URL } from '../Helpers/api.constants';
import { Weather } from '../Models/weather';
import { ApiInterface } from './api.interface';

export class ApiService implements ApiInterface{

    /**
     * Configure API URL
     * @param url 
     */
    private __prepareUri(url:string):string{
        return `${API_BASE_URL}${url}&APPID=${API_APPID}`;
    }

    /**
     * GET verb of HTTP
     * @param url 
     * @param callback 
     */
    public get(url:string,callback){
        this.__ajax('GET',url,callback);
    }

    /**
     * POST verb of HTTP
     * @param url 
     * @param callback 
     */
    public post(url:string, callback){
        this.__ajax('POST',url,callback);
    }

    /**
     * PUT verb of HTTP
     * @param url 
     * @param callback 
     */
    public put(url:string, callback){
        this.__ajax('PUT',url,callback);
    }

    /**
     * DELETE verb of HTTP
     * @param url 
     * @param callback 
     */
    public delete(url:string, callback){
        this.__ajax('DELETE',url,callback);
    }

    
    /** 
     * Ajax
     * @param method
     * @param url 
     * @param callback 
     */
    private __ajax(method, url, callback){
        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200){
                if( typeof callback === 'function' ){
                    callback(xmlhttp.responseText);
                }
            }
        }
        xmlhttp.open(method,this.__prepareUri(url),true);
        xmlhttp.send();
    }

}