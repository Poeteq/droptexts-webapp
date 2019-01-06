import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

import * as d3 from './custom-d3';

@Injectable()
export class D3Service
{
    multipliers: any;
    /**
     * Constructor
     *
     * @param {Platform} _platform
     */
    constructor(private _platform: Platform)
    {
        this.multipliers = { width: 1.5, height: 1.5 };
        if (this._platform.ANDROID || this._platform.IOS)
        {
            this.multipliers.width = this.multipliers.width * 2.5;
            this.multipliers.height = this.multipliers.height * 2;
        }
    }

    applyZoomableBehaviour(svgElement, gElement, containerElement)
    {
        let svg, g, zoomed, zoom, superContainer;
        let width = 0, height = 0;

        superContainer = d3.select(containerElement);
        if (superContainer._groups[0][0])
        {
            width = superContainer._groups[0][0].clientWidth;
            height = superContainer._groups[0][0].clientHeight;
        }

        svg = d3.select(svgElement);
        g = d3.select(gElement);

        zoomed = () => { g.attr("transform", d3.event.transform); };
        zoom = d3.zoom()
            .on("zoom", zoomed)
            .scaleExtent([.6, 2])
            .translateExtent([[0, 0], [width * this.multipliers.width, height * this.multipliers.height]]);

        //todo: add click to zoom button
        //todo: add click handler to jump to zoomed player
        svg.call(zoom);
        // .on("wheel.zoom", null);
    }

    calculateViewBox(containerElement): string
    {
        // default
        let viewBox: string = '0 0 800 800';
        let superContainer;
        let clientWidth = 0, clientHeight = 0;

        superContainer = d3.select(containerElement);
        if (superContainer._groups[0][0])
        {
            clientWidth = superContainer._groups[0][0].clientWidth;
            clientHeight = superContainer._groups[0][0].clientHeight;
        }

        viewBox = `0 0 ${clientWidth} ${clientHeight}`;
        return viewBox;
    }
}