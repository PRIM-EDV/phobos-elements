import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ph-table',
  standalone: true,
  templateUrl: './ph-table.component.html',
  styleUrls: ['./ph-table.component.scss']
})
export class PhTable implements OnInit {

  @Input() label: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
