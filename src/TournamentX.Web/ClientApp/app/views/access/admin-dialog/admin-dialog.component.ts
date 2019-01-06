import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HttpService } from '@app/core/services/http.service';

@Component({
    selector: 'tom-admin-dialog',
    templateUrl: './admin-dialog.component.html',
    styleUrls: ['./admin-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TomAdminDialogComponent
{
    // Public
    code: string;

    /**
     * Constructor
     */
    constructor (
        @Inject(MAT_DIALOG_DATA) data,
        private route: Router,
        private httpService: HttpService,
        public dialogRef: MatDialogRef<TomAdminDialogComponent>) 
    {
        // Set the defaults
        this.code;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Verify code and login
     */
    verify(code)
    {
        this.dialogRef.close();
        this.httpService.adminLogin(code)
            .then(() =>
            {
                this.route.navigate(['dashboard']);
            });
    }
}
