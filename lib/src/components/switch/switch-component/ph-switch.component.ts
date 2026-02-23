import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ph-switch',
    imports: [
      CommonModule
    ],
    templateUrl: './ph-switch.component.html',
    styleUrls: ['./ph-switch.component.scss'],
    standalone: true
})
export class PhSwitch  implements OnInit {

  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  @HostListener('click')
  onClick(ev?: MouseEvent) {
    this.selectedChange.emit();
  }

}
