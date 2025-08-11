import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from "@angular/core";
import { PhSelectItem } from "../select-item-component/select-item.component";

@Component({
  selector: "ph-select-list",
  templateUrl: "./select-list.component.html",
  styleUrls: ["./select-list.component.scss"],
})
export class PhSelectList {
  @Input() label: string = '';

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(PhSelectItem) selectComponents!: QueryList<PhSelectItem>;

  private _value: any = '';

  constructor() {
    // Initialize any necessary state
  }

  @Input()
  public set value(value: any) {
    this._value = value;
    this.updateSelectStates();
  }

  public get value(): any {
    return this._value;
  }

  ngAfterContentInit(): void {
    for(const item of this.selectComponents) {
      console.log(`Found select item: ${item.value}`);
      item.onClick = this.onSelect.bind(this, item);
    }

    this.updateSelectStates();
  }

  private updateSelectStates() {
    if(this.selectComponents == undefined) return;

    for(const item of this.selectComponents) {
      if(item.value === this.value) {
        item.isActive = true;
      }else{
        item.isActive = false;
      }
    }
  }

  onSelect(target: PhSelectItem, evt: MouseEvent): void {
    this.value = target.value;
    this.updateSelectStates();
    this.valueChange.emit(this.value);
  }
}