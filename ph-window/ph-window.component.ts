import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ph-window',
  templateUrl: './ph-window.component.html',
  styleUrls: ['./ph-window.component.scss']
})
export class PhWindowComponent implements OnInit {

  @Input() public title = '';
  @Input() public subtitle = '';


  constructor() { }

  ngOnInit(): void {
  }

}
