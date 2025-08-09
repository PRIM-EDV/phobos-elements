import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ph-textarea',
  standalone: true,
  templateUrl: './ph-textarea.component.html',
  styleUrls: ['./ph-textarea.component.scss']
})
export class PhTextarea implements OnInit {

  @Input() rows: number = 3;
  @Input() label: string = "";
  @Input() value: string = "";

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onValueChange(event: any) {
    this.valueChange.emit(event.target.value);
  }

}
