import { NgModule } from '@angular/core';
import { PhWindowComponent } from './ph-window/ph-window.component';
import { PhButtonListComponent } from './ph-button-list/ph-button-list.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    PhWindowComponent,
    PhButtonListComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    PhWindowComponent,
    PhButtonListComponent
  ],
  providers: [],
  bootstrap: []
})
export class PhElementsModule { }
