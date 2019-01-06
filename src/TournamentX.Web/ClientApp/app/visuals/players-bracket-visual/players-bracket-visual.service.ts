import { Injectable } from '@angular/core';
import { PlayersBracket } from './players-bracket.model';

@Injectable()
export class PlayersBracketVisualService
{
    /**
     * Constructor
     */
    constructor () {}

    /**
     * Return the bracket model with the given bracket data
     *
     * @param {Match[]} data
     * @returns {PlayersBracket}
     */
    getPlayersBracket(data)
    {
        return new PlayersBracket(data);
    }

}