import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '@app/core/services/http.service';

@Component({
    selector: 'tom-dashboard-tournament-dialog',
    templateUrl: './tournament-dialog.component.html',
    styleUrls: ['./tournament-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TomDashboardTournamentDialogComponent implements OnInit, OnDestroy
{
    TournamentType = TournamentType;
    selectedType: TournamentType;
    tournamentForm: FormGroup;
    numberOfStations: number;

    // Private
    private _unsubscribeAll: Subject<any>;


    constructor(
        private fb: FormBuilder,
        private httpService: HttpService,
        public dialogRef: MatDialogRef<TomDashboardTournamentDialogComponent>)
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit()
    {
        this.numberOfStations = 0;
        this.selectedType = TournamentType.None;
        this.tournamentForm = this.fb.group({
            tournamentName: ['', Validators.required]
        });
    }

    ngOnDestroy()
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    selectType(selectedType: TournamentType)
    {
        this.selectedType = selectedType;
    }

    createTournament(tournament)
    {
        if (!tournament) { return; }
        tournament.numberOfStations = this.numberOfStations;
        tournament.style = this.selectedType;
        this.httpService.createTournament(tournament)
            .then(() => {
                this.dialogRef.close();
            });
    }

}

export enum TournamentType
{
    None,
    Single,
    Double
}
