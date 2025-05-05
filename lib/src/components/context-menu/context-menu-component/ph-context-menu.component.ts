import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
} from "@angular/core";

import { PhContextMenuItem } from "../context-menu-item-component/ph-context-menu-item.component";

@Component({
  selector: "ph-context-menu",
  standalone: true,
  imports: [PhContextMenuItem],
  styleUrls: ["./ph-context-menu.component.scss"],
  templateUrl: "./ph-context-menu.component.html",
})
export class PhContextMenu implements AfterViewInit {
  @Input() public entries: Array<{ label: string; action: () => Promise<void> }> = [];
  @Input() public position: { x: number; y: number } = { x: 0, y: 0 };

  constructor(public ref: ElementRef) {
   
  }

  ngAfterViewInit(): void {
    if (this.position) {
      this.ref.nativeElement.style.top = `${this.position.y - 6}px`;
      this.ref.nativeElement.style.left = `${this.position.x - 6}px`;
    }
  }

  public async select(entry: { label: string; action: () => Promise<void> }) {
    console.log("Selected entry:", entry.label);
    try {
      await entry.action();
    } catch (e) {
      console.error(e);
    }
    
    this.close();
  }

  public close() { }
}
