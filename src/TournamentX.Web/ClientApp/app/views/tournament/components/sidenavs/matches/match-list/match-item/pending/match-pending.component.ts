import { Component, Input } from '@angular/core';

@Component({
    selector: 'tom-match-pending',
    templateUrl: './match-pending.component.html',
    styleUrls: ['./match-pending.component.scss']
})
export class TournamentMatchListItemPendingComponent
{
    @Input()
    match: any;
}
