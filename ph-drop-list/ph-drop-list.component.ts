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

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.itemComponents.changes.subscribe((changes) => {
      // console.log(`${this.header} : ${changes.length}`)
      // this.subscriptions.forEach((sub) => {
      //   sub.unsubscribe();
      // })
      changes.forEach((change : any) => {
        const dragStartsub = change.onDragStart.subscribe((item: any) => {this.draggedItem = item;}) as Subscription;
        const dragStopsub = change.onDragStop.subscribe((item: any) => {this.draggedItem = undefined;}) as Subscription;
        this.subscriptions.push(dragStartsub);
        this.subscriptions.push(dragStopsub);
  }); });

  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    for (const list of this.connectedLists) {
        if (list.draggedItem != undefined) {
            this.drop.next(list.draggedItem);
            return;
        }
    }
  }
}
