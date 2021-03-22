import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { NameEntityRecognitionComponent } from './name-entity-recognition/name-entity-recognition.component';
import {LazyLoadingDirective} from './lazy-loading.directive';



@NgModule({
  declarations: [NameEntityRecognitionComponent, LazyLoadingDirective],
  imports: [
    CommonModule
  ],
  exports: [NameEntityRecognitionComponent]
})
export class NameEntityRecognitionModule { }
