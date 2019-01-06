import { Injectable } from '@angular/core';
import { IBracketConfig } from './../shared/';
import { LosersBracket } from './losers-bracket.model';

@Injectable()
export class LosersBracketVisualService
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
     * @returns {LosersBracket}
     */
    getLosersBracket(data, config?): LosersBracket {
        return new LosersBracket(data, config);
    }
}