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

    public draggedItem: any;
    public subscriptions: Array<Subscription> = [];

    private position: number = 0;

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
    this.itemComponents.forEach((itemComponent: PhDropListItemComponent) => {
        const dragStartsub = itemComponent.onDragStart.subscribe((item: any) => {this.setDraggedItem(item)}) as Subscription;
        const dragStopsub = itemComponent.onDragStop.subscribe((item: any) => {this.resetDraggedItem(); this.clearDragOver();}) as Subscription;
        this.subscriptions.push(dragStartsub);
        this.subscriptions.push(dragStopsub);
    });
    this.itemComponents.changes.subscribe((changes) => {
        changes.forEach((change : any) => {
            const dragStartsub = change.onDragStart.subscribe((item: any) => {this.setDraggedItem(item)}) as Subscription;
            const dragStopsub = change.onDragStop.subscribe((item: any) => {this.resetDraggedItem(); this.clearDragOver();}) as Subscription;
            this.subscriptions.push(dragStartsub);
            this.subscriptions.push(dragStopsub);
        });
    });
    }

    public handleMouseOut(ev: MouseEvent) {
        this.clearDragOver();
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
    }

    private clearDragOver() {
        for (const itemComponent of this.itemComponents) {
            // itemComponent.dragOver = false;
        }
    }

    private setDraggedItem(item: any) {
        for (const list of this.connectedLists.concat(this)) {
            list.draggedItem = item;
            list.itemComponents.forEach((itemComponent: PhDropListItemComponent) => {
                itemComponent.draggedItem = item;
            });
        }
    }

    private resetDraggedItem() {
        for (const list of this.connectedLists.concat(this)) {
            list.draggedItem = undefined;
            list.itemComponents.forEach((itemComponent: PhDropListItemComponent) => {
                itemComponent.draggedItem = undefined;
            });
        }
    }
}
