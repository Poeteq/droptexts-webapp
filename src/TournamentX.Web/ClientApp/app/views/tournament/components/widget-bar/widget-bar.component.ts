import { Component } from '@angular/core';
import { SidenavService } from '@app/core/services/sidenav.service';
import { tomAnimations } from '@app/shared/animations';

@Component({
    selector: 'tom-tournament-widget-bar',
    templateUrl: './widget-bar.component.html',
    styleUrls: ['./widget-bar.component.scss'],
    animations: tomAnimations
})
export class TournamentWidgetBarComponent
{
    // Public
    fullscreen: boolean;
    screenWidth: number;

    /**
     * Constructor
     *
     */
    constructor (
        private sidenav: SidenavService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    toggleSidenav()
    {
        this.fullscreen = !this.fullscreen;
        this.sidenav.toggle();
    }
}
