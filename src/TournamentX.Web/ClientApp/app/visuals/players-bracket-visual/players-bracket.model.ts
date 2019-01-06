import * as d3 from './../shared/custom-d3';
import { Match, IBracketConfig } from './../shared';

export class PlayersBracket
{
  // Private
  private _width: number;
  private _height: number;
  private _nodeWidth: number;
  private _nodeHeight: number;
  private _treeMap: any;
  private _bracketData: any;
  private _horizontalSeparation: number;
  private _verticalSeparation: number;

  /**
   * Constructor
   *
   * @param {Match[]} matches
   * @param {IBracketConfig} bracketConfig 
   */
  constructor (matches: Match[], bracketConfig?: IBracketConfig)
  {
    // Set the defaults
    this._nodeWidth = bracketConfig && bracketConfig.nodeWidth || 150;
    this._nodeHeight = bracketConfig && bracketConfig.nodeHeight || 60;
    this._horizontalSeparation = bracketConfig && bracketConfig.horizontalSeparation || 75;
    this._verticalSeparation = bracketConfig && bracketConfig.verticalSeparation || 30;

    // create bracket layout
    this.createLayout();

    // init d3 layout with matches
    this.createBracketData(matches);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  get width(): number
  {
    return this._width;
  }

  get height(): number
  {
    return this._height;
  }

  get nodeWidth(): number
  {
    return this._nodeWidth;
  }

  get nodeHeight(): number
  {
    return this._nodeHeight;
  }

  get nodeVerticalSeparation(): number
  {
    return this._verticalSeparation;
  }

  get nodeHorizontalSeparation(): number
  {
    return this._horizontalSeparation;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setup the visibility of the sidebar
   *
   * @private
   */
  private createLayout()
  {
    this._treeMap = d3.tree()
      .nodeSize([this._nodeHeight + this._verticalSeparation, this._nodeWidth + this._horizontalSeparation])
      .separation((a, b) => a.parent == b.parent ? 1 : 1);
  }

  /**
   * Create bracket data using d3 stratify
   * @param {Match[]} bracketData
   * 
   * @private
   */
  private createBracketData(bracketData: Match[])
  {
    let d = d3.stratify()
      .id(function (d: Match) { return `${d.matchNumber}`; })
      .parentId(function (d: Match) { return d.nextMatchNumber === -1 || d.nextMatchNumber === null || d.nextMatchNumber > bracketData.length ? null : `${d.nextMatchNumber}`; })
      (bracketData);

    let n = this._treeMap(d);

    // changing the bracket layout
    // default is top to bottom
    let s = this.calculateActualSize(n);
    this._height = s[0];
    this._width = s[1];
    let nodes = n.descendants();
    for (var i = 0; i < nodes.length; i++)
    {
      let node = nodes[i];
      node.x = node.x + this.height / 2;
      let y = node.y;
      node.y = node.x;
      node.x = this.width - y;
    }
    this._bracketData = n;
  }

  /**
   * Calculate actual size
   *
   * @private
   */
  private calculateActualSize(t: any): number[]
  {
    let a = t;
    let h = [0, 0];
    while (a.children && a.children.length > 0)
    {
      a = a.children[0];
      h = [a.x, a.y];
    }
    h[0] = Math.abs(h[0]) * 2;
    return h;
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the bracket descendants nodes
   */
  nodes(): any[]
  {
    return this._bracketData.descendants();
  }

  /**
   * Get the bracket descendants links
   */
  links(): any[]
  {
    return this._bracketData.descendants().slice(1);
  }

}
