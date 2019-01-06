import { Component, ElementRef, EventEmitter, Input, Output, AfterViewInit, OnChanges } from '@angular/core';
import { PlayersBracket } from './players-bracket.model';
import { PlayersBracketVisualService } from './players-bracket-visual.service';
import { Player, Match, D3Service } from '../shared';
import * as d3 from './../shared/custom-d3';
import { timeout } from 'rxjs/operators';


@Component({
    selector: 'tom-players-bracket-visual',
    templateUrl: './players-bracket-visual.component.html',
    styleUrls: ['./players-bracket-visual.component.scss'],
    providers: [PlayersBracketVisualService, D3Service]
})
export class PlayersBracketVisualComponent implements AfterViewInit, OnChanges
{
    // Players
    @Input()
    players: Player[];

    // Node clicked
    @Output()
    clicked: EventEmitter<any>;

    // Public
    links: any;
    nodes: any;
    svgTranslation: string;
    viewBox: string;
    height: number;
    width: number;

    // Private
    _margin: any;
    _bracket: PlayersBracket;

    // Protected
    protected containerElement: HTMLElement;
    protected svgElement: SVGElement;
    protected gElement: SVGElement;

    /**
     * Constructor
     *
     * @param {ElementRef} element
     * @param {PlayersBracketVisualService} _bracketService
     * @param {D3Service} _d3Service
     */
    constructor (
        private element: ElementRef,
        private _bracketService: PlayersBracketVisualService,
        private _d3Service: D3Service)
    {
        // Set the defaults
        this.height = 0;
        this.width = 0;
        this.players = [];
        this.clicked = new EventEmitter<any>();

        // Set the private defaults
        this._margin = { left: 20, right: 20 };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * After view init
     */
    ngAfterViewInit() 
    {
        // get reference to svg element
        this.containerElement = (this.element.nativeElement as HTMLElement).querySelector('div');
        this.svgElement = (this.element.nativeElement as HTMLElement).querySelector('svg');
        this.gElement = (this.element.nativeElement as HTMLElement).querySelector('g');
    }

    /**
     * On Changes
     */
    ngOnChanges()
    {
        if (this.players && this.players.length > 1)
        {
            this.generateBracket(this.players);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update Bracket
     * @param data
     * 
     * @private
     */
    updateBracket(data)
    {
        // Init bracket service and get bracket
        this._bracket = this._bracketService.getPlayersBracket(data);

        // Translate svg via margins
        this.svgTranslation = `translate(${this._margin.left},${this._margin.right})`;

        // height and width
        this.height = this._bracket.height + 164;
        this.width = this._bracket.width + 256;
        
        // Init links
        this.links = this._bracket.links();

        // Init nodes
        this.nodes = this._bracket.nodes();


        // Set viewbox ratio
        this.viewBox = this._d3Service.calculateViewBox(this.containerElement);

        // Apply zoomable
        
        // setTimeout(() => {
        //     this._d3Service.applyZoomableBehaviour(this.svgElement, this.gElement, this.containerElement);            
        // }, 500);
    }

    /**
     * Generate bracket From players
     * @param players
     * 
     * @private
     */
    generateBracket(players)
    {
        // Default match seeds
        let m = [[1, 2]];

        // Calculate total number of rounds
        let rounds = Math.ceil(Math.log(players.length) / Math.log(2));

        // Setup match seed placements
        for (let r = 1; r < rounds; r++)
        {
            var t = Math.pow(2, r + 1) + 1;
            var rm = [];
            for (let i = 0; i < m.length; i++)
            {
                rm.push([m[i][0], t - m[i][0]]);
                rm.push([m[i][1], t - m[i][1]]);
            }
            m = rm;
        }

        // Default bracket data
        var bracketData = [];

        // Calculate total number of matches
        let totalMatches = Math.pow(2, rounds);

        for (let matchNumber = 1; matchNumber < totalMatches; matchNumber++)
        {
            // Get match index
            let matchIndex = matchNumber - 1;

            // Calculate next match number
            let nextMatchNumber = Math.ceil(matchNumber / 2) + Math.pow(2, rounds - 1);
            if (nextMatchNumber >= totalMatches) nextMatchNumber = null;

            // Build p1
            let player1: Player = new Player({
                name: playerName(matchIndex, 0),
                seed: playerSeed(matchIndex, 0)
            });

            // Build p2
            let player2: Player = new Player({
                name: playerName(matchIndex, 1),
                seed: playerSeed(matchIndex, 1)
            });

            // Build and append match
            bracketData.push(new Match({
                matchNumber,
                nextMatchNumber,
                player1,
                player2
            }));
        }

        // Generate d3 bracket
        if (bracketData.length > 0) 
        {
            this.updateBracket(bracketData);
        }

        // ---------------------------------
        // @ Internal public methods
        // ---------------------------------

        /**
         * Get player name
         * @param matchIndex
         * @param playerIndex
         */
        function playerName(matchIndex, playerIndex)
        {
            if (matchIndex >= m.length || players[m[matchIndex][playerIndex] - 1] == undefined)
            {
                return null;
            }

            return players[m[matchIndex][playerIndex] - 1]['name'];
        }

        /**
         * Get player seed
         * @param matchIndex
         * @param playerIndex
         */
        function playerSeed(matchIndex, playerIndex)
        {
            if (matchIndex >= m.length || players[m[matchIndex][playerIndex] - 1] == undefined) 
            {
                return null;
            }

            return players[m[matchIndex][playerIndex] - 1]['seed'];
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Translate Node
     * @param node
     */
    nodeTranslation(node: any)
    {
        return `translate(${node.x},${node.y})`;
    }

    /**
     * On player clicked
     * @param d
     * @param player
     */
    onNodeClick(d, player)
    {
        if (player == 1 && d.data.player1Name)
        {
            this.clicked.emit({ d, playerIndex: 'player1Index' });
        }
        else if (player == 2 && d.data.player2Name) 
        {
            this.clicked.emit({ d, playerIndex: 'player2Index' });
        }
    }

    /**
     * Link Path
     * @param node
     */
    linkPath(node: any)
    {
        let b = this._bracket;
        let line = d3.line()
            .x(function (d)
            {
                return d['x'] + b.nodeWidth / 2;
            })
            .y(function (d)
            {
                return d['y'] + b.nodeHeight / 2;
            })
            .curve(d3.curveStep);

        return line([node, node.parent]);
    }

    /**
     * Trim text
     * @param text
     * @param threshold
     */
    trimText(text, threshold) 
    {
        if (text.length <= threshold) return text;
        return text.substr(0, threshold).concat("...");
    }

}
