import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TomAdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { HttpService } from '@app/core/services/http.service';

@Component({
    selector: 'tom-access',
    templateUrl: './access.component.html',
    styleUrls: ['./access.component.scss']
})

export class TomAccessComponent implements OnDestroy
{
    // Public
    email: string;
    token: string;
    name: string;
    errorMessage: string;
    hasError: boolean;
    isLoading: boolean;
    timeoutHandler: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private httpService: HttpService,
        private route: Router,
        private dialog: MatDialog) 
    {
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
     * show admin menu
     */
    showMenu()
    {
        const dialogRef = this.dialog.open(TomAdminDialogComponent, {
            panelClass: 'admin-dialog',
        });

        dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();
    }

    /**
     * login
     */
    attemptAccess(email, token)
    {
        this.isLoading = true;
        let request = this.buildRequest(email, token);
        this.httpService.bulkSend(request)
            .then(response => {
                console.log(response);
            }, error => {
                console.log(error);
            });
        // this.httpService.login(request)
        //     .then(response =>
        //     {
        //         this.isLoading = false;
        //         if (response['responseCode'] == 1)
        //         {
        //             this.route.navigate(['dashboard']);
        //         }
        //         else
        //         {
        //             this.hasError = true;
        //             this.errorMessage = 'Something is wrong.';
        //         }
        //     }, error =>
        //     {
        //         this.isLoading = false;
        //         this.hasError = true;
        //         this.errorMessage = 'Something is wrong.';
        //     });
    }

    private buildRequest(email, token) 
    {
        return {
            to: email,
            body: token
        };
    }
}
