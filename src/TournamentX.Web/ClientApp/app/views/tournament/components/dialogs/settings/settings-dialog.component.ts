import { Component, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '@app/core/services/http.service';

@Component({
    selector: 'tom-tournament-settings-dialog',
    templateUrl: './settings-dialog.component.html',
    styleUrls: ['./settings-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TomTournamentSettingsDialogComponent implements OnDestroy
{
    tournamentId: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) data,
        private route: Router,
        private httpService: HttpService,
        public dialogRef: MatDialogRef<TomTournamentSettingsDialogComponent>)
    {
        // Set the defaults
        this.tournamentId = data;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset tournament
     */
    resetTournament()
    {
        this.httpService.resetTournament(this.tournamentId)
            .then(() =>
            {
                this.route.navigate(["/tournament", this.tournamentId, "bracket", "players"]);
                this.dialogRef.close();
            });
    }
}
