import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../../core/config/app.config';
import { IAppConfig } from '../../core/config/iapp.config';

@Injectable({
    providedIn: 'root'
})
export class TomDashboardService {

    constructor(private http: HttpClient) {
        // this.apiUrl = AppConfig.endpoints.to
    }

    getTournaments(): Observable<any> {
        return this.http.get(`${AppConfig.endpoints.tom}api/tournament/all`);
    }

    getEvents(organizerId: number): Observable<any> {
        return this.http.get(`api/event/all`);
    }

    createEvent(tournament) {
        return this.http.post("api/event", tournament);
    }

}
