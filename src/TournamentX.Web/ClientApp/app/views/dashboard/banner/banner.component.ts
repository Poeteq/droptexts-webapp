import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TomDashboardTournamentDialogComponent } from '@app/views/dashboard/tournament-dialog/tournament-dialog.component';
import { HttpService } from '@app/core/services/http.service';

@Component({
	selector: 'tom-dashboard-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss']
})
export class TomDashboardBannerComponent implements OnDestroy
{
	@Output()
	created: EventEmitter<any>;

	// Private
	private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
	constructor (
		public dialog: MatDialog,
		private httpService: HttpService) 
	{
		// Set the defaults
		this.created = new EventEmitter<any>();

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
     * Navigate and show bracket
     */
	showTournamentDialog()
	{
		const dialogRef = this.dialog.open(TomDashboardTournamentDialogComponent,
			{
				panelClass: 'tournament-dialog'
			});

		dialogRef.afterClosed().subscribe(tournament =>
		{
					this.created.emit();
			// if (!tournament) { return; }
			// this.httpService.createTournament(tournament)
			// 	.pipe(takeUntil(this._unsubscribeAll))
			// 	.subscribe(res =>
			// 	{
			// 	});
		});
	}
}
