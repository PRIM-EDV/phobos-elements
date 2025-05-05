import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';

import { PhDropdownItem } from '../dropdown-item-component/ph-dropdown-item.component';

@Component({
  selector: 'ph-dropdown',
  standalone: true,
  styleUrls: ['./ph-dropdown.component.scss'],
  templateUrl: './ph-dropdown.component.html'
})
export class PhDropdown implements OnInit, AfterContentInit {

    @ViewChild('dropdown') dropdown!: ElementRef<HTMLDivElement>;
    @ContentChildren(PhDropdownItem) items!: QueryList<PhDropdownItem>;

    @Input() label: string = "";
    @Input() value: any = "";

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    public  valueLabel: string = "";

    private expanded = false;

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
        for(const item of this.items) {
            item.onClick = this.onItemClick.bind(this, item);
        }
      }
    

    toggle() {
        if(this.expanded) {
            this.close();
        } else {
            this.open();
        }
    }

    onItemClick(target: PhDropdownItem, evt: MouseEvent): void {
        this.value = target.value;
        this.valueLabel = target.label;
        this.valueChange.emit(this.value);
        this.close();
    }

    private open() {
        this.dropdown.nativeElement.style.overflow = 'visible';
        this.expanded = true;
    }

    private close() {
        this.dropdown.nativeElement.style.overflow = 'hidden';
        this.expanded = false;
    }

}
