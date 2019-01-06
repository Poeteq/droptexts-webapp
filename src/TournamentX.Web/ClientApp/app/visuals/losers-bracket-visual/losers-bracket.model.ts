import { IBracketConfig } from './../shared';
import * as d3 from './../shared/custom-d3';


export class LosersBracket {

  private treeMap: any;
  private bracketData: any;
  private matches: any;
  private _width: number;
  private _height: number;
  private _nodeWidth: number;
  private _nodeHeight: number;
  private horizontalSeparation: number;
  private verticalSeparation: number;

  constructor(matches: any, bracketConfig?: IBracketConfig){
    this._nodeWidth = bracketConfig && bracketConfig.nodeWidth || 150;
    this._nodeHeight = bracketConfig && bracketConfig.nodeHeight || 60;
    this.horizontalSeparation = bracketConfig && bracketConfig.horizontalSeparation || 75;
    this.verticalSeparation = bracketConfig && bracketConfig.verticalSeparation || 30;

    this.matches = matches;
    this.createLayout();
    this.createBracketData(matches);
  }

  nodes(){
    return this.bracketData.descendants();
  }

  links(){
    return this.bracketData.descendants().slice(1);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get nodeWidth(){
    return this._nodeWidth;
  }
  get nodeHeight(){
    return this._nodeHeight;
  }

  get nodeVerticalSeparation(){
    return this.verticalSeparation;
  }

  get nodeHorizontalSeparation(){
    return this.horizontalSeparation;
  }

  private createLayout(){       
    this.treeMap = d3.tree()
    .nodeSize([this._nodeHeight+this.verticalSeparation,this._nodeWidth+this.horizontalSeparation])
  		.separation((a,b) => a.parent == b.parent ? 1 : 1);
  }

  private createBracketData(bracketData : any){
    let d = d3.stratify()
              .id(function(d: any) {return d.setIndex;})
              .parentId(function(d: any) {return d.nextSetIndex;})
              (bracketData);   
    
    let n = this.treeMap(d);          
    
    // changing the bracket layout
    // default is top to bottom

    let s = this.calculateActualSize(n);
    this._height = s[0];
    this._width = s[1];    
    let nodes = n.descendants();
    for (var i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      node.x = node.x+this.height/2;
      let y = node.y;
      node.y = node.x;
      node.x = this.width-y;      
    }    
    this.bracketData = n;
      
  }

  private calculateActualSize(t: any) {
    let a = t;
    let h = [0,0];
    while(a.children && a.children.length > 0){
      a = a.children[0];
      h = [a.x,a.y];
    }
    h[0] = Math.abs(h[0])*2;    
    return h;
  }

}