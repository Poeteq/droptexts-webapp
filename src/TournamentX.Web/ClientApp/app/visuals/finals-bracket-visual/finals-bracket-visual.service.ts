import { Injectable } from '@angular/core';
import { IBracketConfig } from './../shared/';
import { FinalsBracket } from './finals-bracket.model';

@Injectable()
export class FinalsBracketVisualService
{
    /**
     * Constructor
     */
    constructor () {}
    /**
     * Return the bracket model with the given bracket data
     *
     * @param {Match[]} data
     * @param {IBracketConfig} config
     * @returns {FinalsBracket}
     */
    getFinalsBracket(data, config?): FinalsBracket {
        return new FinalsBracket(data, config);
    }
}