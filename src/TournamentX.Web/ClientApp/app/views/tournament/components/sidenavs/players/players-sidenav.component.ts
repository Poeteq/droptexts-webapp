import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { tomAnimations } from '@app/shared/animations';
import { HttpService } from '@app/core/services/http.service';
import { FireService } from './../../../services/fire.service';
import { TomTournamentPlayerNotificationsDialogComponent } from '../../dialogs/player-notifications/player-notifications-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'tom-players-sidenav',
    templateUrl: './players-sidenav.component.html',
    styleUrls: ['./players-sidenav.component.scss'],
    animations: tomAnimations
})
export class PlayersSidenavComponent implements OnInit, OnChanges, OnDestroy
{
    @Input()
    tournamentId: string;

    @Input()
    isLoading: boolean;

    // Public
    playersReady: boolean;
    searchText: string;
    swapIndex: number;
    isSwapState: boolean;
    players: any[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor (
        private dialog: MatDialog,
        private fireService: FireService,
        private httpService: HttpService)
    {
        // Set the defaults
        this.playersReady = false;
        this.searchText = '';
        this.players = [];

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
        this.fireService.syncPlayers(this.tournamentId)
            .pipe(debounceTime(256))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(players =>
            {
                this.isLoading = false;
                this.playersReady = true;
                this.players = players.sort((a, b) =>
                {
                    return a.seed - b.seed;
                });
            });
    }

    /**
     * On changes
     */
    ngOnChanges()
    {
        this.isLoading = false;
        this.playersReady = true;
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
     * Set players
     */
    setPlayers(players)
    {
        if (players)
        {
            this.players = players;
            this.setLoading(false);
        }
    }

    /**
     * Add player
     */
    onAdd(playerName)
    {
        if (playerName)
        {
            this.searchText = '';
            this.isLoading = true;
            this.httpService.addPlayer(this.tournamentId, playerName)
                .then();
        }
    }

    /**
     * Player dragged and dropped
     */
    onDrop(event)
    {
        this.httpService.swap(this.tournamentId, event.playerSeed, event.dropSeed)
            .then();
    }

    /**
     * Set loading
     */
    setLoading(bool: boolean)
    {
        this.isLoading = bool;
    }

    /**
     * Swap players in two indexes
     */
    onSwap(index)
    {
        if (index >= 0)
        {
            if (!this.isSwapState)
            {
                this.swapIndex = index;
                this.isSwapState = true;
            } else
            {
                this.isSwapState = false;
                this.httpService.swap(this.tournamentId, this.swapIndex, index)
                    .then();
            }
        }
    }

    /**
     * Remove player
     */
    onRemove(seed)
    {
        if (typeof seed === "number")
        {
            this.httpService.deletePlayer(this.tournamentId, seed)
                .then();
        }
    }

    /**
     * Open notification table
     */
    openNotificationsDialog(player) {
        const dialogRef = this.dialog.open(TomTournamentPlayerNotificationsDialogComponent, {
            panelClass: 'player-notifications-dialog',
            data: {
                player: player,
                tournamentId: this.tournamentId
            }
        });

        dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();
    }

}
