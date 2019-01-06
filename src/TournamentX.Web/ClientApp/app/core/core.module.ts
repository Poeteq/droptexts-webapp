import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { APP_CONFIG, AppConfig } from './config/app.config';
import { EnsureModuleLoadedOnceGuard } from './guards/guards';
import { HttpService } from './services/http.service';
import { SidenavService } from './services/sidenav.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
    imports: [
        CommonModule, 
        HttpClientModule,
        AngularFireModule.initializeApp(AppConfig.firebase), 
        AngularFireDatabaseModule
    ],
    providers: [
        HttpService, 
        SidenavService, 
        AuthGuard, 
        { provide: APP_CONFIG, useValue: AppConfig }
    ]
})

// Ensure that CoreModule is only loaded into AppModule
// Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
export class CoreModule extends EnsureModuleLoadedOnceGuard
{
    constructor (@Optional() @SkipSelf() parentModule: CoreModule)
    {
        super(parentModule);
    }
}
