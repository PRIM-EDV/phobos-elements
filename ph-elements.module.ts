import { NgModule } from '@angular/core';
import { PhWindowComponent } from './ph-window/ph-window.component';
import { PhButtonSelectComponent } from './ph-button-select/ph-button-select.component';
import { PhSidebarComponent } from './ph-sidebar/ph-sidebar.component';
import { PhTopbarComponent } from './ph-topbar/ph-topbar.component';
import { PhFormComponent } from './ph-form/ph-form.component';
import { PhInputComponent } from './ph-input/ph-input.component';
import { PhButtonComponent } from './ph-button/ph-button.component';
import { PhCommandListComponent } from './ph-command-list/ph-command-list.component';
import { PhButtonListComponent } from './ph-button-list/ph-button-list.component';
import { PhTableComponent } from './ph-table/ph-table.component';
import { PhContextMenuComponent } from './ph-context-menu/ph-context-menu.component';
import { PhContextMenuItemComponent } from './ph-context-menu-item/ph-context-menu-item.component';

@NgModule({
  declarations: [
    PhWindowComponent,
    PhButtonSelectComponent,
    PhSidebarComponent,
    PhTopbarComponent,
    PhFormComponent,
    PhInputComponent,
    PhButtonComponent,
    PhCommandListComponent,
    PhButtonListComponent,
    PhTableComponent,
    PhContextMenuComponent,
    PhContextMenuItemComponent
  ],
  imports: [],
  exports: [
    PhWindowComponent,
    PhSidebarComponent,
    PhTopbarComponent,
    PhFormComponent,
    PhButtonListComponent,
    PhButtonSelectComponent,
    PhButtonComponent,
    PhInputComponent,
    PhCommandListComponent,
    PhTableComponent,
    PhContextMenuComponent,
    PhContextMenuItemComponent
  ],
  providers: [],
  bootstrap: []
})
export class PhElementsModule { }
