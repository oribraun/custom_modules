import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgTrixComponentComponent } from './ng-trix-component/ng-trix-component.component';
import {NgTrixLibModule} from "../../projects/ng-trix-lib/src/lib/ng-trix-lib.module";

@NgModule({
    declarations: [
        AppComponent,
        NgTrixComponentComponent
    ],
    imports: [
        BrowserModule,
        NgTrixLibModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
