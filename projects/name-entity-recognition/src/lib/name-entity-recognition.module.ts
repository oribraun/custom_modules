import { NgModule } from '@angular/core';
import { NameEntityRecognitionComponent } from './name-entity-recognition/name-entity-recognition.component';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [NameEntityRecognitionComponent],
  imports: [
    CommonModule
  ],
  exports: [NameEntityRecognitionComponent]
})
export class NameEntityRecognitionModule { }
