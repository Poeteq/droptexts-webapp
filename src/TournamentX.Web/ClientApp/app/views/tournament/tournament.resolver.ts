import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { first } from 'rxjs/operators';

import { Tournament } from '../../shared/models';
import { TournamentService } from './tournament.service';
import { FireService } from './services/fire.service';

@Injectable()
export class TournamentResolver implements Resolve<Tournament> {
    constructor(private fireService: FireService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<Tournament> {
        const id = route.paramMap.get("id");
        return new Promise((resolve, reject) => {
            this.fireService.syncTournament(id).pipe(first())
                .subscribe(tournament => {
                    tournament.id = id;
                    resolve(tournament);
                }, reject);
        })
    };
}