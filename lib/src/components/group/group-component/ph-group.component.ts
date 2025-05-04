import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ph-group',
  standalone: true,
  styleUrls: ['./ph-group.component.scss'],
  templateUrl: './ph-group.component.html'
})
export class PhGroup implements OnInit {
    @Input() label: string = '';

    ngOnInit(): void {
    }
}