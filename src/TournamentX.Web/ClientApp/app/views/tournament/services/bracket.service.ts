import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Bracket } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class BracketService
{
    bracketId$: Subject<string>;
    bracket$: Subject<Bracket>;

    constructor () {
        this.bracket$ = new Subject();
        this.bracketId$ = new Subject();
    }

    setBracketId$(id: string): void
    {
        if (id && id.length > 0) {
            this.bracketId$.next(id);
        }
    }

    setBracket(bracket: Bracket): void
    {
        this.bracket$.next(bracket);
    }

}