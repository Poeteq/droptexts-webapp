import { Component, ElementRef, EventEmitter, Input, Output, AfterViewInit, OnChanges } from '@angular/core';
import { IBracketConfig, MatchSet, D3Service } from '../shared';
import { LosersBracket } from './losers-bracket.model';
import { LosersBracketVisualService } from './losers-bracket-visual.service';
import * as d3 from './../shared/custom-d3';

@Component({
  selector: 'tom-losers-bracket-visual',
  templateUrl: './losers-bracket-visual.component.html',
  styleUrls: ['./losers-bracket-visual.component.scss'],
  providers: [LosersBracketVisualService, D3Service]
})
export class LosersBracketVisualComponent implements AfterViewInit, OnChanges
{
  // Tournament
  @Input()
  bracket: any;

  // Node clicked
  @Output()
  clicked: EventEmitter<any>;

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
  _bracket: LosersBracket;

  // Protected
  protected containerElement: HTMLElement;
  protected svgElement: SVGElement;
  protected gElement: SVGElement;

  /**
   * Constructor
   *
   * @param {ElementRef} element
   * @param {LosersBracketVisualService} _bracketService
   * @param {D3Service} _d3Service
   */
  constructor(
    private element: ElementRef,
    private _bracketService: LosersBracketVisualService,
    private _d3Service: D3Service)
  {
    // Set the defaults
    this.height = 0;
    this.width = 0;
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
    if (this.bracket && this.bracket.losersBracket)
    {
      this.matchesChanged(this.bracket.losersBracket);
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
    // Init bracket config
    let config: IBracketConfig = {} as IBracketConfig;
    config.nodeWidth = 300;
    config.nodeHeight = 60;
    config.horizontalSeparation = 75;
    config.verticalSeparation = 30;

    // Init bracket service and get bracket
    this._bracket = this._bracketService.getLosersBracket(data, config);

    // Translate svg via margins
    this.svgTranslation = `translate(${this._margin.left},${this._margin.right})`;


    // height and width
    this.height = this._bracket.height * 1.2 + 164;
    this.width = this._bracket.width * 1.5 + 512;

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
   * Matches changed
   * @param matches
   * 
   * @private
   */
  matchesChanged(matches)
  {
    if (matches.length > 0)
    {
      this.generateBracketFromMatches(matches);
    }
  }

  /**
   * Generate bracket From matches
   * @param matcheSets
   * 
   * @private
   */
  generateBracketFromMatches(matchSets)
  {
    let b = [];
    let sortedMatchSets = matchSets.sort((a, b) => a.matchSetIndex - b.matchSetIndex);

    sortedMatchSets.forEach(matchSet =>
    {
      b.push(new MatchSet(matchSet));
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
   * @param matchNum
   */
  onNodeClick(d, player, matchNum)
  {
    // Match 1
    if (matchNum == 1)
    {
      // Clicked match 1 : player 1
      if (player == 1 && d.data.matchOne.player1.name && !d.data.matchOne.player1.isBye()) 
      {
        this.clicked.emit(d.data.matchOne);
      }

      // Clicked match 1 : player 2
      else if (player == 2 && d.data.matchOne.player2.name && !d.data.matchOne.player2.isBye())
      {
        this.clicked.emit(d.data.matchOne);
      }

    }

    // Match 2
    if (matchNum == 2)
    {
      // Clicked match 2 : player 1
      if (player == 1 && d.data.matchTwo.player1.name && !d.data.matchTwo.player2.isBye())
      {
        this.clicked.emit(d.data.matchTwo);
      }

      // Clicked match 2 : player 2
      else if (player == 2 && d.data.matchTwo.player2.name && !d.data.matchTwo.player2.isBye())
      {
        this.clicked.emit(d.data.matchTwo);
      }
    }
  }

  /**
   * Player hovered
   * @param d
   * @param player
   * @param matchNum
   */
  hover(d, player, matchNum)
  {
    // Match 1
    if (matchNum == 1)
    {
      // Bye ~ do nothing
      if (player == 1 && d.data.matchOne.player1.isBye()) return;
      if (player == 2 && d.data.matchOne.player2.isBye()) return;

      // Hovered match 1 : player 1
      if (player == 1 && d.data.matchOne.player1.name) 
      {
        this.hoveredName = d.data.matchOne.player1.name;
      }

      // Hovered match 1 : player 2
      if (player == 2 && d.data.matchOne.player2.name && !d.data.matchOne.player2.isBye())
      {
        this.hoveredName = d.data.matchOne.player2.name;
      }
    }

    // Match 2 
    if (matchNum == 2)
    {
      // Bye ~ do nothing
      if (player == 1 && d.data.matchTwo.player1.isBye()) return;
      if (player == 2 && d.data.matchTwo.player2.isBye()) return;

      // Hovered match 2 : player 1
      if (player == 1 && d.data.matchTwo.player1.name)
      {
        this.hoveredName = d.data.matchTwo.player1.name;
      }

      // Hovered match 2 : player 2
      if (player == 2 && d.data.matchTwo.player2.name && !d.data.matchTwo.player2.isBye())
      {
        this.hoveredName = d.data.matchTwo.player2.name;
      }
    }
  }

  /**
   * On player leaved
   * @param d
   * @param player
   * @param matchNum
   */
  leave(d, player, matchNum)
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
