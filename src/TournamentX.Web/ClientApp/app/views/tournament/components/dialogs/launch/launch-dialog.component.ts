import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '@app/core/services/http.service';
import { TomSnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';

@Component({
    selector: 'tom-launch-dialog',
    templateUrl: './launch-dialog.component.html',
    styleUrls: ['./launch-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TomTournamentLaunchDialogComponent implements OnInit, OnDestroy
{
    tournamentId: string;
    stations: number;
    playersPerPool: number;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor(
        private router: Router,
        public snackBar: MatSnackBar,
        private httpService: HttpService,
        public dialogRef: MatDialogRef<TomTournamentLaunchDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data)
    {
        // Set the defaults
        this.tournamentId = data;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit()
    {
    }

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
     * Launch tournament
     */
    launchTournament(numberOfStations, numberOfPlayersPerPool)
    {
        let request = this.buildLaunchTournamentRequest(numberOfStations, numberOfPlayersPerPool, this.tournamentId);
        this.httpService.launchTournament(this.tournamentId, request)
            .then(() =>
            {
                this.dialogRef.close();
                this.notifySnackBar();
                this.router.navigate(["/tournament", this.tournamentId, "bracket", "", "winners"]);
            });
    }

    notifySnackBar() 
    {
        this.snackBar.openFromComponent(TomSnackBarComponent, {
            data: {
                message: 'Tournament has launched!'
            }
        });
    }

    private buildLaunchTournamentRequest(numberOfStations, numberOfPlayersPerPool, tournamentId)
    {
        return {
            numberOfStations: numberOfStations,
            numberOfPlayersPerPool: numberOfPlayersPerPool,
            tournamentId: tournamentId
        }
    }
}
