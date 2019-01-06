import { Injectable } from '@angular/core';
import { WinnersBracket } from './winners-bracket.model';

@Injectable()
export class WinnersBracketVisualService
{
    /**
     * Constructor
     */
    constructor () { }

    /**
     * Return the bracket model with the given bracket data
     *
     * @param data
     */
    getWinnersBracket(data): WinnersBracket
    {
        return new WinnersBracket(data);
    }

}