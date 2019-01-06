import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { tomAnimations } from '@app/shared/animations';

@Component({
    selector: 'tom-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss'],
    animations: tomAnimations
})
export class PlayerListComponent implements OnChanges
{
    @Input() 
    players: any[];

    @Input() 
    cachedPlayers: any[];

    @Input() 
    isSwapState: boolean;

    @Input() 
    searchText: string;

    @Output()
    openNotifications: EventEmitter<any>;

    @Output() 
    add: EventEmitter<any>;

    @Output() 
    drop: EventEmitter<any>;

    @Output() 
    swap: EventEmitter<any>;

    @Output() 
    remove: EventEmitter<any>;

    @Output() 
    loading: EventEmitter<any>;


    constructor()
    {
        this.add = new EventEmitter<any>();
        this.drop = new EventEmitter<any>();
        this.swap = new EventEmitter<any>();
        this.remove = new EventEmitter<any>();
        this.loading = new EventEmitter<any>();
        this.openNotifications = new EventEmitter<any>();
    }

    ngOnChanges()
    {
        this.cachedPlayers = this.players;
    }

    onAdd(playerName)
    {
        this.loading.emit(true);
        this.add.emit(playerName);
    }

    onDrop(el)
    {
        this.drop.emit({
            playerSeed: el.value.seed,
            dropSeed: el.dropIndex + 1
        });
    }

    onSwap(index)
    {
        this.swap.emit(index);
    }

    onRemove(seed)
    {
        this.remove.emit(seed);
    }

    onLoading(bool: boolean)
    {
        this.loading.emit(bool);
    }

    onOpenNotify(player)
    {
        this.openNotifications.emit(player);
    }

}
