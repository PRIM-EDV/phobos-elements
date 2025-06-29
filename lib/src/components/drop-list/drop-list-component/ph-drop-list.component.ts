import { AfterContentInit, Component, ContentChildren, EventEmitter, HostListener, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';

import { PhDropListItem } from '../drop-list-item-component/ph-drop-list-item.component';
import { DropListService } from '../core/drop-list.service';

@Component({
    selector: 'ph-drop-list',
    standalone: true,
    styleUrls: ['./ph-drop-list.component.scss'],
    templateUrl: './ph-drop-list.component.html'
})
export class PhDropList implements AfterContentInit {

    @Input() header: string = '';
    @Input() connectedLists: Array<PhDropList> = [];
    @Output() drop: EventEmitter<any> = new EventEmitter<any>();
    @ContentChildren(PhDropListItem) itemComponents!: QueryList<PhDropListItem>;

    private dropIndex = 0;
    private subscriptions: Array<Subscription> = [];

    constructor(
        private readonly service: DropListService
    ) { }

    ngAfterContentInit(): void {
        this.bindOnDropEvents(this.itemComponents.toArray());
        this.itemComponents.changes.subscribe((changes) => {
            this.bindOnDropEvents(changes.toArray());
        });
    }

    public handleMouseOut(ev: MouseEvent) {
        this.dropIndex = this.itemComponents.length;
    }

    @HostListener('document:mouseup', ['$event'])
    onMouseUp(event: MouseEvent) {
        if (this.service.draggedItem != undefined) {
            this.drop.next({index: this.dropIndex, data: this.service.draggedItem.data});
        }
        this.resetDraggedItem();
    }

    private clearSubscriptions() {
        this.subscriptions.forEach((sub: Subscription) => {
            sub.unsubscribe();
        });
        this.subscriptions = [];
    }

    private bindOnDropEvents(items: PhDropListItem[]) {
        this.clearSubscriptions();

        items.forEach((item, index) => {
            this.subscriptions.push(
                item.onDragStart.subscribe(() => this.setDraggedItem(item)),
                item.onDragStop.subscribe(() => this.resetDraggedItem()),
                item.onDragOver.subscribe(() => this.dropIndex = this.getDropIndex(this.service.draggedItem!, item))
            );
            item.index = index;
        });
    }

    private getDropIndex(draggedItem: PhDropListItem, overItem: PhDropListItem) {
        const peers = this.itemComponents.toArray().filter((item: PhDropListItem) => item !== draggedItem);
        return peers.indexOf(overItem);
    }

    private setDraggedItem(item: any) {
        this.service.draggedItem = item;
    }

    private resetDraggedItem() {
        this.service.draggedItem = undefined;
        this.dropIndex = 0;
    }
}
