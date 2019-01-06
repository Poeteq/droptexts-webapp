import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { Unsubscribable as AnonymousSubscription } from 'rxjs';
import { FilterPipe } from './../../../../shared/pipes/filter.pipe'


@Component({
    selector: 'tom-pending-match-list',
    templateUrl: './pending-match-list.component.html',
    styleUrls: ['./pending-match-list.component.scss']
})

export class TournamentPendingMatchListComponent implements OnInit, OnChanges
{
    @Input() matches;
    @Input() pq;
    displayedColumns = ['handle', 'opponent', 'predictedStartTime', 'round'];
    dataSource: any = new MatTableDataSource<AnonymousSubscription>([]);
    
    // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    ngOnInit() {
        // if (this.matchesObs)
        // {  
        //     this.matchesObs.subscribe(matches => {
        //         this.dataSource = new MatTableDataSource<AnonymousSubscription>(new FilterPipe().transform(matches, 'pending'));
        //     });
            
        // }
    }

    ngOnChanges() {
        let filteredMatches = new FilterPipe().transform(this.matches, 'Ready').sort((a, b) => this.sortMatchByPriority(a, b));;
        filteredMatches.concat(new FilterPipe().transform(this.matches, 'Awaiting'));
        let result = this.mapMatchStartTime(filteredMatches, this.pq);
        this.dataSource = new MatTableDataSource<AnonymousSubscription>(result);
    }

    mapMatchStartTime(allMatches, priorityQueue) {
        if (!allMatches || !priorityQueue) return;
        let result = [];
        
        for (var i=0; i < allMatches.length; i++) {
            let match = allMatches[i];
            
            for (var j=0; j < priorityQueue.length; j++) {
                if (priorityQueue[j].matchNumber == match.matchNumber) {
                    match.predictedStartTime = new Date(priorityQueue[j].predictedStartTime);
                }
            }
            result.push(match);
        }

        return result;
    }

    /**
     * Sort match by priority
     */
    private sortMatchByPriority(a, b): number
    {
        //hack: fix finals priority
        if (a.isFinals) {
            a.round = 9999;
        }
        
        //hack: fix finals priority
        if (b.isFinals) {
            b.round = 9999;
        }

        if (a.round === b.round)
        {
            return a.matchNumber - b.matchNumber
        }

        return a.round - b.round
    }
}

export interface Element {
    position: number,
    handle: string;
    opponent: string;
    station: number;
    round: number;
    predictedStartTime: string;
  }

// const ELEMENT_DATA: Element[] = [
//     {position: 0,handle: "Jaycetheace", opponent: 'Lap Chi', station: 1, round: 1},
//     {position: 1,handle: "Infiltration", opponent: 'Tokido', station: 1, round: 1},
//     {position: 2,handle: "Punk", opponent: 'Daigo', station: 1, round: 1},
//     {position: 3,handle: "Nemo", opponent: 'Itabashi Zangief', station: 1, round: 1},
//     {position: 4,handle: "Bonchan", opponent: 'Justin', station: 1, round: 1},
//     {position: 5,handle: "NuckleDu", opponent: 'Air', station: 1, round: 1},
//     {position: 6,handle: "Momochi", opponent: 'Alex Valle', station: 1, round: 1},
//     {position: 7,handle: "Jozhear", opponent: 'Lap Chi', station: 1, round: 1}
//   ];