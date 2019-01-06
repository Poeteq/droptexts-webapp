import { Component, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '@app/core/services/http.service';

@Component({
    selector: 'tom-tournament-user-management-dialog',
    templateUrl: './user-management-dialog.component.html',
    styleUrls: ['./user-management-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TomTournamentUserManagementDialogComponent implements OnDestroy
{
    user = { name: '', email: '' };
    accessToken: string;
    showToken: boolean;
    tournamentId: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) data,
        private httpService: HttpService,
        public dialogRef: MatDialogRef<TomTournamentUserManagementDialogComponent>)
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

    getAccessToken(user)
    {
        var request = this.buildGetAccessTokenRequest(user);
        this.httpService.grantAccessToken(request)
            .then(data =>
            {
                if (data.payload && data.payload.token)
                {
                    this.showToken = true;
                    this.accessToken = data.payload.token;
                }
            })
    }

    reset()
    {
        this.user = { name: '', email: '' };
        this.accessToken = '';
        this.showToken = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private buildGetAccessTokenRequest(user) {
        return {
            tournamentId: this.tournamentId,
            name: user.name,
            email: user.email
        }
    }

}
