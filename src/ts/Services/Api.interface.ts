export interface ApiInterface{
    get(url:string,callback);
    post(url:string,callback);
    put(url:string,callback);
    delete(url:string,callback);
}
