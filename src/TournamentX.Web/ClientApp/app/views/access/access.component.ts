import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSelectionList, MatListOption } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TomAdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { HttpService } from '@app/core/services/http.service';
import { TomUploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'tom-access',
    templateUrl: './access.component.html',
    styleUrls: ['./access.component.scss']
})

export class TomAccessComponent implements OnDestroy, OnInit
{
    // @ViewChild(MatSelectionList) selectionList: MatSelectionList;


    // Public
    email: string;
    token: string;
    name: string;
    message: string;
    errorMessage: string;
    hasError: boolean;
    isLoading: boolean;
    timeoutHandler: any;
    fileNames: any = [];
    selectedFile: string;
    responseMessage: string;
    errors: string[];
    showResponse: boolean;

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

    ngOnInit(): void
    {
        // this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);

        this.loadFiles();
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

    deleteFile(fileName)
    {
        this.httpService.deleteFile(fileName)
        .then(success => {
            this.loadFiles();
        }, error => {
            console.log(error);
        });
    }

    onSelection(a, b)
    {
        console.log(a);
        console.log(b);
    }

    getValue(event)
    {
        console.log(event.target.parentNode.innerText);
        this.selectedFile = event.target.parentNode.innerText;
    }

    handleSelection(event)
    {
        if (event.option.selected)
        {
            event.source.deselectAll();
            event.option._setSelected(true);
        }
    }

    /**
     * show admin menu
     */
    showMenu()
    {
        this.showResponse = false;
        const dialogRef = this.dialog.open(TomUploadDialogComponent, {
            panelClass: 'admin-dialog',
        });

        dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() =>
            {
                this.loadFiles();
            });
    }

    loadFiles()
    {

        this.httpService.getAllContacts()
            .then(fileNames =>
            {
                this.fileNames = fileNames;
                console.log(this.fileNames);
            }, error =>
            {
                console.log(error);
            })
    }

    /**
     * login
     */
    attemptAccess(email, token)
    {
        if (!this.selectedFile) {
            return;
        }

        this.isLoading = true;
        let request = this.buildRequest(this.selectedFile, this.message);
        console.log(request);
        this.httpService.bulkSendToContacts(request)
            .then(response =>
            {
                this.isLoading = false;
                this.responseMessage = response.responseMessage;
                this.errors = response.payload.errors;
                this.showResponse = true;
                console.log(response);
            }, error =>
            {
                this.isLoading = false;
                this.responseMessage = error.responseMessage;
                this.errors = error.payload.errors;
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

    private buildRequest(fileName, message) 
    {
        return {
            fileName: fileName.trim(),
            message: message
        };
    }
}
