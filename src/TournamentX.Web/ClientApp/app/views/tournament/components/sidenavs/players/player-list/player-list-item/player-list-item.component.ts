import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { tomAnimations } from '@app/shared/animations';
import { MatDialog } from '@angular/material';
import { TomTournamentPlayerNotificationsDialogComponent } from '@app/views/tournament/components/dialogs/player-notifications/player-notifications-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'tom-player-list-item',
    templateUrl: './player-list-item.component.html',
    styleUrls: ['./player-list-item.component.scss'],
    animations: tomAnimations
})
export class PlayerListItemComponent implements OnDestroy
{
    @Input()
    player: any;

    @Input()
    isSwapState: boolean;

    @Input()
    index: number;

    @Output()
    swap: EventEmitter<any>;

    @Output()
    remove: EventEmitter<any>;

    @Output()
    loading: EventEmitter<any>;

    @Output()
    openNotify: EventEmitter<any>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor (
    )
    {
        this.swap = new EventEmitter<any>();
        this.remove = new EventEmitter<any>();
        this.loading = new EventEmitter<any>();
        this.openNotify = new EventEmitter<any>();

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


    onSwap()
    {
        if (this.player)
        {
            this.swap.emit(this.player.seed);
        }

        if (this.isSwapState)
        {
            this.showloader();
        }
    }

    onRemove()
    {
        this.showloader();
        this.remove.emit(this.player.seed);
    }

    onOpenNotify()
    {
        this.openNotify.emit(this.player);
    }


    private showloader()
    {
        this.loading.emit(true);
    }
}
