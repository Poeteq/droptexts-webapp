import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { Bracket } from '@app/shared/models';
import { FireService } from './../services/fire.service';
import { BracketService } from '../services/bracket.service';

@Injectable()
export class BracketResolver implements Resolve<Bracket> {
    constructor (
        private router: Router,
        private fireService: FireService,
        private bracketService: BracketService) 
    {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<Bracket>
    {
        const id = route.paramMap.get("bracketId");
        if (!id || id.length == 0)
        {
            const tid = route.parent.parent.paramMap.get("id");
            this.fireService.syncTournament(tid).pipe(first())
                .subscribe(tournament =>
                {
                    let bid = tournament.brackets[0].bracketId;
                    this.router.navigate(["tournament", tid, "bracket", bid, "winners"]);
                });
        } else
        {
            this.bracketService.setBracketId$(id);
            return new Promise((resolve, reject) =>
            {
                this.fireService.syncBracket(id).pipe(first())
                    .subscribe(bracket =>
                    {
                        bracket.id = id;
                        resolve(bracket);
                    }, reject);
            })

        }
    };
}