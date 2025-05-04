import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnInit, Output, QueryList, EventEmitter } from '@angular/core';

import { PhButton } from '../button-component/ph-button.component';


@Component({
  selector: 'ph-button-select',
  standalone: true,
  styleUrls: ['./ph-button-select.component.scss'],
  templateUrl: './ph-button-select.component.html'
})
export class PhButtonSelect implements OnInit, AfterContentInit, AfterViewInit {

  @Input() label: string = '';

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(PhButton) buttonComponents!: QueryList<PhButton>;

  private _value: any = '';

  constructor() { }

  @Input()
  public set value(value: any) {
    this._value = value;
    this.updateButtonStates();
  }

  public get value(): any {
    return this._value;
  }

  ngAfterContentInit(): void {
    for(const button of this.buttonComponents) {
      button.onClick = this.onButtonClick.bind(this, button);
    }

    this.updateButtonStates();
  }

  ngAfterViewInit(): void {
  }

  onButtonClick(target: PhButton, evt: MouseEvent): void {
    this.value = target.value;
    this.updateButtonStates();
    this.valueChange.emit(this.value);
  }

  ngOnInit(): void {
  }

  private updateButtonStates() {
    if(this.buttonComponents == undefined) return;

    for(const button of this.buttonComponents) {
      if(button.value == this.value) {
        button.isActive = true;
      }else{
        button.isActive = false;
      }
    }
  }

}
