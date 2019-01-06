import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { TournamentService } from '@app/views/tournament/tournament.service';
import { FireService } from './fire.service';

@Injectable()
export class ParentBracketGuardService implements CanActivate
{
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fireService: FireService)
    {

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const id = route.parent.paramMap.get("id");
        let bracketId = route.paramMap.get("bracketId");


        return new Promise((resolve) =>
        {
            let urlPaths = this.router.url.split('/');
            let isRoot = urlPaths[urlPaths.length - 1] == "bracket";
            if (!isRoot)
            {
                resolve(true);
                return;
            }

            this.fireService.syncTournament(id).pipe(first())
                .subscribe(tournament =>
                {
                    if (!bracketId || bracketId.length == 0)
                    {
                        bracketId = tournament.brackets[0].bracketId;
                    }

                    if (tournament.state == 2)
                    {
                        this.router.navigate(["tournament", id, "bracket", bracketId, "winners"]);
                        resolve(false);
                    }
                    resolve(true);
                }, error =>
                    {
                        this.router.navigate(["tournament", id, "bracket", bracketId, "winners"]);
                        resolve(false);
                    });
        })
    }
}



@Injectable()
export class BracketGuardService implements CanActivate
{
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fireService: FireService)
    {

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const id = route.parent.parent.paramMap.get("id");
        let bracketId = route.paramMap.get("bracketId");

        return new Promise((resolve) =>
        {
            this.fireService.syncTournament(id).pipe(first())
                .subscribe(tournament =>
                {
                    if (tournament.state == 2)
                    {
                        if (!bracketId || bracketId.length == 0)
                        {
                            bracketId = tournament.brackets[0].bracketId;
                        }

                        this.router.navigate(["tournament", id, "bracket", bracketId, "winners"]);
                        resolve(false);
                    }
                    resolve(true);
                }, error =>
                    {
                        this.router.navigate(["tournament", id, "bracket", bracketId, "winners"]);
                        resolve(false);
                    });
        })
    }
}


@Injectable()
export class LiveBracketGuardService implements CanActivate
{
    constructor(
        private router: Router,
        private fireService: FireService) 
    {

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const id = route.parent.parent.paramMap.get("id");
        return new Promise((resolve) =>
        {
            this.fireService.syncTournament(id).pipe(first())
                .subscribe(tournament =>
                {
                    if (tournament.state == 1)
                    {
                        this.router.navigate(["tournament", id, "bracket", "players"]);
                        resolve(false);
                    }
                    resolve(true);
                }, error =>
                    {
                        this.router.navigate(["tournament", id, "bracket", "players"]);
                        resolve(false);
                    });
        })
    }

}
