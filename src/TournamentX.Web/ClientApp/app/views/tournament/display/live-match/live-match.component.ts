import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'tom-live-match',
    templateUrl: './live-match.component.html',
    styleUrls: ['./live-match.component.scss']
})

export class TournamentLiveMatchComponent implements OnChanges
{
    @Input() match;
    @Input() stations;

    stationName: string;
    confirmingWinner: boolean = false;
    constructor(){}

    ngOnChanges() {
        for (let i=0; i < this.stations.length; i++) {
            if (this.stations[i].matchNumber == this.match.matchNumber) {
                this.stationName = this.stations[i].name;
            }
        }
    }

}
