import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '@app/core/services/http.service';

@Component({
    selector: 'tom-tournament-log-dialog',
    templateUrl: './log-dialog.component.html',
    styleUrls: ['./log-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TomTournamentLogDialogComponent implements OnInit, OnDestroy
{
    // Public
    searchItems: any[] = [];
    searchText = '';
    tournamentId: string;
    
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor(
        private httpService: HttpService,
        public dialogRef: MatDialogRef<TomTournamentLogDialogComponent>,
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

    /**
     * On init
     */
    ngOnInit()
    {
        this.httpService.getTournamentLogs(this.tournamentId)
            .then(response =>
            {
                if (response.payload && response.payload.logs)
                {
                    this.searchItems = response.payload.logs;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
