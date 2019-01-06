import { InjectionToken } from '@angular/core';
import { IAppConfig } from './iapp.config';
import { environment } from '@env/environment';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
    endpoints: {
        tom: environment.serverUrl
    },
    firebase: {
        apiKey: "AIzaSyD9gQSKETqVK30sZy6SVAjxvh0W8b5xvIY",
        authDomain: "tx-core-app.firebaseapp.com",
        databaseURL: "https://tx-core-app.firebaseio.com",
        projectId: "tx-core-app",
        storageBucket: "tx-core-app.appspot.com",
        messagingSenderId: "884981159770"
    }
};
