import { Component, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '@app/core/services/http.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TomSnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';

@Component({
    selector: 'tom-tournament-player-notifications-dialog',
    templateUrl: './player-notifications-dialog.component.html',
    styleUrls: ['./player-notifications-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TomTournamentPlayerNotificationsDialogComponent implements OnDestroy
{
    tournamentId: string;
    player: any;
    playerForm: FormGroup;

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
        private _formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<TomTournamentPlayerNotificationsDialogComponent>)
    {
        // Set the defaults
        this.player = data.player;
        this.tournamentId = data.tournamentId;

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.playerForm = this.createPlayerForm();
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
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createPlayerForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.player.playerId],
            name            : [this.player.name],
            phoneNumber     : [this.player.phoneNumber],
            email           : [this.player.email],
            seed            : [this.player.seed],
            notificationTypeId: 2
        });
    }

    subscribe() 
    {
        this.httpService.updatePlayer(this.playerForm.value)
            .then(() => {
                this.dialogRef.close();
                this.notifySnackBar();
            });
    }

    notifySnackBar() 
    {
        this.snackBar.openFromComponent(TomSnackBarComponent, {
            data: {
                message: "Player's notification type updated successfully!"
            }
        });
    }
}
