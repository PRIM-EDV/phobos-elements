import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ph-sidebar',
  standalone: true,
  styleUrls: ['./ph-sidebar.component.scss'],
  templateUrl: './ph-sidebar.component.html'
})
export class PhSidebar implements OnInit {
  @Input() public icon: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
