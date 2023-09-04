import { AfterContentInit, Component, ContentChildren, EventEmitter, HostListener, Input, OnInit, Output, QueryList } from '@angular/core';
import { PhDropListItemComponent } from '../ph-drop-list-item/ph-drop-list-item.component';

@Component({
  selector: 'ph-drop-list',
  templateUrl: './ph-drop-list.component.html',
  styleUrls: ['./ph-drop-list.component.scss']
})
export class PhDropListComponent implements OnInit, AfterContentInit {

  @Input() header: string = '';
  @Input() connectedLists: Array<PhDropListComponent> = [];

  @Output() drop: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(PhDropListItemComponent) itemComponents!: QueryList<PhDropListItemComponent>;

//   public output.
  public draggedItem: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    // this.itemComponents.changes();
    for(const item of this.itemComponents) {
      item.onDragStart.subscribe((item) => {this.draggedItem = item;});
      item.onDragStop.subscribe()
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    console.log("UP?")
    for (const list of this.connectedLists) {
        console.log(this.connectedLists)
        if (list.draggedItem != undefined) {
            console.log("??")
            this.drop.next(list.draggedItem);
            return;
        }
    }
  }
}
