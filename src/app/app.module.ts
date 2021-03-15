import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgTrixComponentComponent } from './ng-trix-component/ng-trix-component.component';
// import {NgTrixLibModule} from "../../projects/ng-trix-lib/src/lib/ng-trix-lib.module";
import {NgTimeToStringModule} from '../../projects/ng-time-to-string/src/lib/ng-time-to-string.module';
import {NameEntityRecognitionModule} from '../../projects/name-entity-recognition/src/lib/name-entity-recognition.module';
// import {NameEntityRecognitionModule} from 'name-entity-recognition';

@NgModule({
  declarations: [
    AppComponent,
    NgTrixComponentComponent
  ],
  imports: [
    BrowserModule,
    // NgTrixLibModule,
    NgTimeToStringModule,
    NameEntityRecognitionModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
