import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TomTournamentLaunchDialogComponent } from './../dialogs/launch/launch-dialog.component';
import { HttpService } from '@app/core/services/http.service';
import { tomAnimations } from '@app/shared/animations';

@Component({
    selector: 'tom-tournament-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    animations: tomAnimations
})

export class TournamentNavBarComponent implements OnDestroy
{
    @Input()
    tournamentId: string;

    // Public
    dialogRef: any;
    
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor (
        private router: Router,
        private dialog: MatDialog,
        private httpService: HttpService)
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
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
     * Show launch dialog
     */
    showLaunchDialog()
    {
        this.dialogRef = this.dialog.open(TomTournamentLaunchDialogComponent, {
            panelClass: 'launch-dialog',
            data: this.tournamentId
        });

        this.dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();
    }

    /**
     * Launch tournament
     */
    launchTournament()
    {
        this.httpService.launchTournament(this.tournamentId, {})
            .then(() =>
            {
                setTimeout(() => {
                    this.router.navigate(["/tournament", this.tournamentId, "bracket", null, "winners"]);
                }, 1000);
            });
    }
}
