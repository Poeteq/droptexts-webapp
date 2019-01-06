import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { HttpService } from '@app/core/services/http.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private httpService: HttpService, private route: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {
            this.httpService.whoAmI().then(user => {
                    if (user) {
                        resolve(true);                        
                    } else {
                        this.route.navigate(['access']);
                        resolve(false);
                    }
                }, error => {
                    this.route.navigate(['access']);
                    resolve(false);
                });
        });
    }

}