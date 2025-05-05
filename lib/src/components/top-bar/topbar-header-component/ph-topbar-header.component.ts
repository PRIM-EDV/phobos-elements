import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ph-topbar-header',
  standalone: true,
  styleUrls: ['./ph-topbar-header.component.scss'],
  templateUrl: './ph-topbar-header.component.html'
})
export class PhTopbarHeader implements OnInit {

  @Input() title: string = '';
  @Input() subtitle: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
