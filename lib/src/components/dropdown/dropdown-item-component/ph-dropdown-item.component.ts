import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ph-dropdown-item',
  standalone: true,
  styleUrls: ['./ph-dropdown-item.component.scss'],
  templateUrl: './ph-dropdown-item.component.html'
})
export class PhDropdownItem implements OnInit {

    @Input() label: string = "";
    @Input() value: any = "";

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {}

    constructor() { }

    ngOnInit(): void {
    }

}
