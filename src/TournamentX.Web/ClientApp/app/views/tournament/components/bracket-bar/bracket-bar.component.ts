import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TomTournamentLogDialogComponent } from './../dialogs/logs/log-dialog.component';
import { TomTournamentSettingsDialogComponent } from './../dialogs/settings/settings-dialog.component';
import { TomTournamentUserManagementDialogComponent } from './../dialogs/user-management/user-management-dialog.component';
import { HttpService } from '@app/core/services/http.service';
import { tomAnimations } from '@app/shared/animations';
import { SidenavService } from '@app/core/services/sidenav.service';

export enum BracketState
{
    Winners = 'winners',
    Losers = 'losers',
    Finals = 'finals',
}

@Component({
    selector: 'tom-tournament-bracket-bar',
    templateUrl: './bracket-bar.component.html',
    styleUrls: ['./bracket-bar.component.scss'],
    animations: tomAnimations
})

export class TournamentBracketBarComponent implements OnDestroy
{
    @Input()
    tournamentId: string;

    @Input()
    bracketId: string;

    @Input()
    style: number;

    // Public
    BracketState = BracketState;
    state: any;
    name: string;
    timeoutHandler: any;
    dialogRef: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor (
        private route: Router,
        private dialog: MatDialog,
        private sidenav: SidenavService,
        private httpService: HttpService) 
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit()
    {
        let urlPaths = this.route.url.split('/');
        this.state = urlPaths[urlPaths.length - 1] == "players" ? "winners" : urlPaths[urlPaths.length - 1];
        console.log(this.state);
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
     * Navigate and show bracket
     */
    showBracket(state)
    {
        this.state = state;
        this.route.navigate(["/tournament", this.tournamentId, "bracket", this.bracketId,  state]);
        this.sidenav.open();
    }

    showDashboard() {
        this.route.navigate(["/tournament", this.tournamentId, "bracket", this.bracketId,  'display']);
        this.sidenav.close();
    }

    /**
     * Show add users dialog
     */
    showAddUsersDialog()
    {
        const dialogRef = this.dialog.open(TomTournamentUserManagementDialogComponent, {
            panelClass: 'user-management-dialog',
            data: this.tournamentId
        });

        dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();
    }

    /**
     * Show logs dialog
     */
    showLogsDialog()
    {
        this.dialogRef = this.dialog.open(TomTournamentLogDialogComponent, {
            panelClass: 'log-dialog',
            data: this.tournamentId
        });

        this.dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();
    }

    /**
     * Show settings dialog
     */
    showSettingsDialog()
    {
        this.dialogRef = this.dialog.open(TomTournamentSettingsDialogComponent, {
            panelClass: 'settings-dialog',
            data: this.tournamentId
        });

        this.dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();
    }

    /**
     * Mouse let go reset button
     */
    mouseup()
    {
        if (this.timeoutHandler)
        {
            clearTimeout(this.timeoutHandler);
            this.name = "canceled";
            this.timeoutHandler = null;
        }
    }

    /**
     * Mouse down reset button
     */
    mousedown()
    {
        this.timeoutHandler = setTimeout(() =>
        {
            this.name = "has been long pressed"
            this.timeoutHandler = null;
            this.resetTournament();
        }, 1500);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset tournament
     */
    private resetTournament()
    {
        this.httpService.resetTournament(this.tournamentId)
            .then(() =>
            {
                this.route.navigate(["/tournament", this.tournamentId, "bracket", "players"]);
            });
    }
}
