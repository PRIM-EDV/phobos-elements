import { Component, Host, HostBinding, HostListener, Input } from "@angular/core";

@Component({
  selector: "ph-select-item",
  templateUrl: "./select-item.component.html",
  styleUrls: ["./select-item.component.scss"],
})
export class PhSelectItem {
  @Input() value: string | number = '';
  @Input() @HostBinding('class.active') isActive: boolean = false;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {}
}