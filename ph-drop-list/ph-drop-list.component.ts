import { AfterContentInit, Component, ContentChildren, EventEmitter, HostListener, Input, OnInit, Output, QueryList } from '@angular/core';
import { PhDropListItemComponent } from '../ph-drop-list-item/ph-drop-list-item.component';
import { Subscription } from 'rxjs';

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
  public subscriptions: Array<Subscription> = [];

  private position: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.itemComponents.changes.subscribe((changes) => {
      console.log("change")
      this.fixPositions(changes);
      changes.forEach((change : any) => {
        const dragStartsub = change.onDragStart.subscribe((item: any) => {this.draggedItem = item;}) as Subscription;
        const dragStopsub = change.onDragStop.subscribe((item: any) => {this.draggedItem = undefined;}) as Subscription;
        this.subscriptions.push(dragStartsub);
        this.subscriptions.push(dragStopsub);
      });
    });
  }

  public handleMouseOut(ev: MouseEvent) {
    for (const itemComponent of this.itemComponents) {
      itemComponent.ref.nativeElement.style.paddingTop = null;
    }
  }

  public handleItemMouseOver(ev: MouseEvent) {
    let val = false;
    for (const itemComponent of this.itemComponents) {
      if (itemComponent.ref.nativeElement.contains(ev.target)) {
        this.position = itemComponent.data.position; 
        for (const list of this.connectedLists.concat(this)) {
          if (list.draggedItem != undefined) {
            val = true;
            const rect = itemComponent.ref.nativeElement.getBoundingClientRect();
            itemComponent.ref.nativeElement.style.paddingTop = `${rect.height}px`;
          } 
        }
      } else {
        itemComponent.ref.nativeElement.style.paddingTop = null;
      }
    }

    if (val == false) {
      this.position = 100;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    for (const list of this.connectedLists.concat(this)) {
        if (list.draggedItem != undefined) {
          list.draggedItem.position = this.position;
          this.drop.next(list.draggedItem);
          this.position = 0;
          return;
        }
    }

    for (const itemComponent of this.itemComponents) {
      itemComponent.ref.nativeElement.style.paddingTop=null;
    }
  }

  private fixPositions(items: QueryList<PhDropListItemComponent>) {
    const list = Array.from(items);
    const orderedItems = list.sort(((a, b) => a.data.position - b.data.position));
    for (let i = 0; i < orderedItems.length; i++) {
      orderedItems[i].data.position = i;
    }
  }
}
