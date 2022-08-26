import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'ph-context-menu',
  templateUrl: './ph-context-menu.component.html',
  styleUrls: ['./ph-context-menu.component.scss']
})
export class PhContextMenuComponent implements OnInit {

  @HostBinding('style') style = "display: none";

  public isOpened = false;

  constructor(private ref:ElementRef) {
    window.addEventListener('mousedown', (e) => {  
      if(!ref.nativeElement.contains(e.target)) {
        this.close();
      }
    });

    window.addEventListener('wheel', (e) => {  
      if(!ref.nativeElement.contains(e.target)) {
        this.close();
      }
    });
  }

  ngOnInit(): void {
  }

  public open(position?: {x: number, y: number}) {
    if(position) {
      console.log(position)
      this.style = `top: ${position.y - 6}px; left: ${position.x - 6}px`;
      // this.style = `top: ${10}px; left: ${10}px`;

    } else {
      this.style = "";
    }

    this.isOpened = true;
  }

  public close() {
    this.isOpened = false;
    this.style = "display: none";
  }

}
