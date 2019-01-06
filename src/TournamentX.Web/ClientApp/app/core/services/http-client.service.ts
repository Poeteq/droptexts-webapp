import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '@app/core/config/app.config';

export interface RequestUrlConfig {
    url: string;
    options?: any;
    body?: any;
    toPromise?: boolean;
}

@Injectable({ providedIn: 'root' })
export class HttpClientService
{
    /**
     * Constructor
     */
    constructor(private http: HttpClient) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public
    // -----------------------------------------------------------------------------------------------------

    get(requestUrlConfig: RequestUrlConfig): Promise<any>
    {
        let httpUrl = this.getController(requestUrlConfig.url);
        return this.http.get(httpUrl, requestUrlConfig.options).toPromise();
    }

    post(requestUrlConfig: RequestUrlConfig): Promise<any>
    {
        let httpUrl = this.getController(requestUrlConfig.url);
        return this.http.post(httpUrl, requestUrlConfig.body, requestUrlConfig.options).toPromise();
    }

    put(requestUrlConfig: RequestUrlConfig): Promise<any>
    {
        let httpUrl = this.getController(requestUrlConfig.url);
        return this.http.put(httpUrl, requestUrlConfig.body, requestUrlConfig.options).toPromise();
    }

    delete(requestUrlConfig: RequestUrlConfig): Promise<any>
    {
        let httpUrl = this.getController(requestUrlConfig.url);
        return this.http.delete(httpUrl, requestUrlConfig.options).toPromise();
    }
    
    // -----------------------------------------------------------------------------------------------------
    // @ Private
    // -----------------------------------------------------------------------------------------------------

    private getController(actionRoute: string)
    {
        return AppConfig.endpoints.tom + actionRoute;
    }
}
