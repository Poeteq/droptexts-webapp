import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[tournamentWidgetToggle]'
})
export class TomTournamentWidgetToggleDirective
{
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
