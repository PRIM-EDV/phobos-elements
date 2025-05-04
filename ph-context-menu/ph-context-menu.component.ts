import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from "@angular/core";

@Component({
  selector: "ph-context-menu",
  standalone: false,
  styleUrls: ["./ph-context-menu.component.scss"],
  templateUrl: "./ph-context-menu.component.html",
})
export class PhContextMenuComponent implements AfterViewInit {
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

  // public open(config:) {
  //   if(position) {
  //     this.ref.nativeElement.style.top = `${position.y - 6}px`;
  //     this.ref.nativeElement.style.left = `${position.x - 6}px`;
  //   }
  //   this.ref.nativeElement.style.display = "block";
  //   this.isOpened = true;
  // }

  public close() {

  }
}
