import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ph-command-list',
  standalone: true, 
  templateUrl: './ph-command-list.component.html',
  styleUrls: ['./ph-command-list.component.scss']
})
export class PhCommandList implements OnInit {

  @Input() label: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
