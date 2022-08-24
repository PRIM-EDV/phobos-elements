import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnInit, Output, QueryList, EventEmitter } from '@angular/core';
import { PhButtonComponent } from '../ph-button/ph-button.component';


export interface PhButtonListOption {
  label: string;
  func: any;
}

@Component({
  selector: 'ph-button-select',
  templateUrl: './ph-button-select.component.html',
  styleUrls: ['./ph-button-select.component.scss']
})
export class PhButtonSelectComponent implements OnInit, AfterContentInit, AfterViewInit {

  @Input() label: string = '';

  @Output() valueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

  @ContentChildren(PhButtonComponent) buttonComponents!: QueryList<PhButtonComponent>;

  private _value: string | number = '';

  constructor() { }

  @Input()
  public set value(value: string | number) {
    this._value = value;
    this.updateButtonStates();
  }

  public get value(): string | number {
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

  onButtonClick(target: PhButtonComponent, evt: MouseEvent): void {
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
