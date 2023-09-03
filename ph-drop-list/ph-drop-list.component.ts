import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ph-drop-list',
  templateUrl: './ph-drop-list.component.html',
  styleUrls: ['./ph-drop-list.component.scss']
})
export class PhDropListComponent implements OnInit {

  @Input() header: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
