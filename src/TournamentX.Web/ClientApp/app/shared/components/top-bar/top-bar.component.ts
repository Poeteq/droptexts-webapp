import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SidenavService } from '@app/core/services/sidenav.service';
import { HttpService } from '@app/core/services/http.service';
import { BracketService } from '@app/views/tournament/services/bracket.service';

@Component({
    selector: 'tom-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TomTopBarComponent implements OnInit
{

    @Input()
    tournamentName: string;

    @Input()
    tournamentId: string;


    @Input()
    brackets: any[];

    // Public
    name: string;
    bracketId: string;
    bracketName: string;
    timeoutHandler: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private sidenav: SidenavService,
        private dialog: MatDialog,
        private httpService: HttpService,
        private bracketService: BracketService)
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit()
    {
        this.bracketService.bracketId$.subscribe(bid =>
        {
            this.bracketId = bid;
            this.bracketName = null;
            if (!this.brackets) return;
            
            for (var i = 0; i < this.brackets.length; i++)
            {
                if (this.brackets[i].bracketId == this.bracketId && this.brackets[i].name != this.tournamentName)
                {
                    this.bracketName = this.brackets[i].name;
                }
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * toggle sidenav
     */
    toggleSidenav(): void { if (this.sidenav) this.sidenav.toggle(); }

    /**
     * navigate to dashboard
     */
    goToDashboard(): void { this.router.navigate(['dashboard']); }

    /**
     * navigate to users profile page
     */
    redirectToUsers(): void { this.router.navigate(['user/profile']); }

    /**
     * navigate to tournament
     */
    goToBracket(bid): void { this.router.navigate(['tournament', this.tournamentId, 'bracket', bid, "winners"]) };

    /**
     * logout
     */
    logout(): void
    {
        this.httpService.logout()
            .then(() => { this.router.navigate(["access"]); });
    }

}
