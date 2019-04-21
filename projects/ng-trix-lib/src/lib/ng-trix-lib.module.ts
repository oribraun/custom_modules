import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { NgTrixLibComponent } from './ng-trix-lib.component';

@NgModule({
  declarations: [NgTrixLibComponent],
  imports: [
      FormsModule
  ],
  exports: [NgTrixLibComponent]
})
export class NgTrixLibModule { }
