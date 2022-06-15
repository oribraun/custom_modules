import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { NameEntityRecognitionComponent } from './name-entity-recognition/name-entity-recognition.component';
import {LazyLoadingDirective} from './lazy-loading.directive';
import {SafeHtmlPipe} from './safe.html.pipe';



@NgModule({
    declarations: [NameEntityRecognitionComponent, LazyLoadingDirective, SafeHtmlPipe],
  imports: [
    CommonModule,
  ],
  exports: [NameEntityRecognitionComponent]
})
export class NameEntityRecognitionModule { }
