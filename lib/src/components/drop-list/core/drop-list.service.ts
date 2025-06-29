import { Injectable } from '@angular/core';
import { PhDropListItem } from '../drop-list-item-component/ph-drop-list-item.component';

// export interface DropItem {
//   id: string;
//   data: any;
// }

// export interface DropList {
//   id: string;
//   items: DropItem[];
// }

@Injectable({
  providedIn: 'root'
})
export class DropListService {
  public draggedItem: PhDropListItem | undefined;

  constructor() {}


  // /**
  //  * Start dragging an item
  //  */
  // startDrag(item: DropItem): void {
  //   this.activeDropItem.next(item);
  // }

  // /**
  //  * End dragging
  //  */
  // endDrag(): void {
  //   this.activeDropItem.next(null);
  // }
}