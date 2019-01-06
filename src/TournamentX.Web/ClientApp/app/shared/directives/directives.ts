import { NgModule } from '@angular/core';

import { TomPerfectScrollbarDirective } from './perfect-scrollbar.directive';
import { TomIfOnDomDirective } from './if-on-dom.directive';
@NgModule({
    imports: [],
    declarations: [ TomPerfectScrollbarDirective, TomIfOnDomDirective ],
    exports: [ TomPerfectScrollbarDirective, TomIfOnDomDirective ]
})
export class TomDirectivesModule 
{

}