import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService
{
    /**
     * Constructor
     */
    constructor(private http: HttpClientService) {}

    bulkSend(request): Promise<any>
    {
        let httpUrl = `api/message/bulk/send`;
        return this.http.post({
            url: httpUrl,
            body: request
        });
    }

    bulkSendToContacts(request): Promise<any>
    {
        let httpUrl = `api/message/contacts/send`;
        return this.http.post({
            url: httpUrl,
            body: request
        });
    }

    getAllContacts(): Promise<any>
    {
        let httpUrl = `api/contacts/all`;
        return this.http.get({
           url: httpUrl
        });
    }

    deleteFile(fileName): Promise<any>
    {
        let httpUrl = `api/contacts/${fileName}`;
        return this.http.delete({
           url: httpUrl
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Tournament APIs
    // -----------------------------------------------------------------------------------------------------

    getTournaments(): Promise<any>
    {
        let httpUrl = `api/tournament/all`;
        return this.http.get({
            url: httpUrl
        });
    }

    resetTournament(tid: string): Promise<any>
    {
        let httpUrl = `api/tournament/${tid}/reset`;
        return this.http.get({
            url: httpUrl
        })
    }

    launchTournament(tournamentId, request: any): Promise<any>
    {
        let httpUrl = `api/tournament/${tournamentId}/start`;
        return this.http.post({
            url: httpUrl,
            body: request
        });
    }

    createTournament(tournament: any)
    {
        let httpUrl = `api/tournament/create`;
        return this.http.post({
            url: httpUrl,
            body: tournament
        });
    }

    resetMatch(tid, request)
    {
        let httpUrl = `api/tournament/${tid}/match`;
        return this.http.post({
            url: httpUrl,
            body: request
        });
    }

    getTournamentLogs(tid: string): Promise<any>
    {
        let httpUrl = `api/tournament/${tid}/logs`;
        return this.http.get({
            url: httpUrl
        });
    }

    swap(tid, i, i2)
    {
        let httpUrl = `api/tournament/${tid}/swap?index1=${i}&index2=${i2}`;
        return this.http.get({
            url: httpUrl
        });
    }

    addPlayer(tournamentId: string, name: string): Promise<any>
    {
        let httpUrl = `api/tournament/${tournamentId}/player`;
        return this.http.post({
            url: httpUrl,
            body: { name: name }
         });
    }

    deletePlayer(tournamentId: string, seed: number): Promise<any>
    {
        let httpUrl = `api/tournament/${tournamentId}/player?seed=${seed}`;
        return this.http.delete({
            url: httpUrl
        });
    }

    
    // -----------------------------------------------------------------------------------------------------
    // @ Admin APIs
    // -----------------------------------------------------------------------------------------------------

    adminLogin(accessToken: string): Promise<any>
    {
        let httpUrl = `api/admin/login`;
        return this.http.post({
            url: httpUrl,
            body: { accessToken: accessToken }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ User APIs
    // -----------------------------------------------------------------------------------------------------
    
    whoAmI()
    {
        let httpUrl =  `api/user/whoAmI`;
        return this.http.get({
            url: httpUrl
        });
    }

    logout()
    {
        let httpUrl = `api/user/logout`;
        return this.http.get({
            url: httpUrl
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Organizer APIs
    // -----------------------------------------------------------------------------------------------------
    
    login(data)
    {
        let httpUrl = `api/organizer/login`;
        return this.http.post({
            url: httpUrl,
            body: data
        });
    }

    grantAccessToken(request: any): Promise<any>
    {
        let httpUrl = `api/organizer/accessToken`;
        return this.http.post({
            url: httpUrl,
            body: request
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Bracket APIs
    // -----------------------------------------------------------------------------------------------------

    sendNotification(bracketId, matchId, request)
    {
        let httpUrl = `api/bracket/${bracketId}/match/${matchId}/notify`;
        return this.http.post({
            url: httpUrl,
            body: request
        });
    }

    updateMatch(request) 
    {
        let httpUrl = `api/bracket/${request.bracketId}/match`;
        return this.http.post({
            url: httpUrl,
            body: request
        });
    }
    
    // -----------------------------------------------------------------------------------------------------
    // @ Player APIs
    // -----------------------------------------------------------------------------------------------------

    updatePlayer(request: any): Promise<any>
    {
        let httpUrl = `api/player`;
        return this.http.put({
            url: httpUrl,
            body: request
        });
    }
}
