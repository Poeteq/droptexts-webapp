import { Component, EventEmitter, ElementRef, Input, Output, OnChanges, AfterViewInit } from '@angular/core';
import { WinnersBracket } from './winners-bracket.model';
import { WinnersBracketVisualService } from './winners-bracket-visual.service';
import { D3Service, Match } from '../shared';
import * as d3 from './../shared/custom-d3';

@Component({
    selector: 'tom-winners-bracket-visual',
    templateUrl: './winners-bracket-visual.component.html',
    styleUrls: ['./winners-bracket-visual.component.scss'],
    providers: [WinnersBracketVisualService, D3Service]
})

export class WinnersBracketVisualComponent implements AfterViewInit, OnChanges
{
    // Type
    @Input()
    type: string;

    // Bracket
    @Input()
    bracket: any;

    // Node clicked
    @Output()
    nodeClicked: EventEmitter<any>;

    // Public
    links: any;
    nodes: any;
    hoveredName: string;
    svgTranslation: string;
    viewBox: string;
    height: number;
    width: number;

    // Private
    _margin: any;
    _bracket: WinnersBracket;

    // Protected
    protected containerElement: HTMLElement;
    protected svgElement: SVGElement;
    protected gElement: SVGElement;

    /**
     * Constructor
     *
     * @param {ElementRef} element
     * @param {WinnersBracketVisualService} _bracketService
     * @param {D3Servoce} _d3Service
     */
    constructor (
        private element: ElementRef,
        private _bracketService: WinnersBracketVisualService,
        private _d3Service: D3Service)
    {
        // Set the defaults
        this.type = null;
        this.height = 0;
        this.width = 0;
        this.nodeClicked = new EventEmitter<any>();

        // Set the private defaults
        this._margin = { left: 30, right: 30 };
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
        if (this.bracket)
        {
            if (this.type == 'matches' && this.bracket.winnersBracket)
            {
                this.generateMatches(this.bracket.winnersBracket);
            }
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
    private updateBracket(data)
    {
        // Init bracket service and get bracket
        this._bracket = this._bracketService.getWinnersBracket(data);

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
        // this._d3Service.applyZoomableBehaviour(this.svgElement, this.gElement, this.containerElement);
    }

    /**
     * Generate matches
     * 
     * @private
     */
    private generateMatches(matches)
    {
        if (matches.length > 1)
        {
            this.generateBracketFromMatches(matches);
        }
    }

    /**
     * Generate bracket From matches
     * @param matches
     * 
     * @private
     */
    generateBracketFromMatches(matches)
    {
        let b = [];
        let sortedMatches = matches.sort((a, b) => a.matchNumber - b.matchNumber);

        sortedMatches.forEach(match =>
        {
            b.push(new Match(match));
        });

        this.updateBracket(b);
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
     * On Node Clicked
     * @param d
     * @param player
     */
    onNodeClick(d, player)
    {
        if (player == 1 && !d.data.player1.isBye())
        {
            this.nodeClicked.emit(d.data);
        }

        else if (player == 2 && !d.data.player2.isBye())
        {
            this.nodeClicked.emit(d.data);
        }
    }

    /**
     * On Node Clicked
     * @param d
     * @param player
     */
    playerHovered(d, player)
    {
        if (player == 1 && d.data.player1.isBye()) return;
        if (player == 2 && d.data.player2.isBye()) return;

        if (player == 1 && d.data.player1.name) 
        {
            this.hoveredName = d.data.player1.name;
        }

        if (player == 2 && d.data.player2.name && !d.data.player2.isBye())
        {
            this.hoveredName = d.data.player2.name;
        }
    }

    /**
     * On Node Clicked
     * @param d
     * @param player
     */
    leave(d, player)
    {
        this.hoveredName = null;
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
