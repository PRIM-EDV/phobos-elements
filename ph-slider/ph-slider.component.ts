import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ph-slider',
  templateUrl: './ph-slider.component.html',
  styleUrls: ['./ph-slider.component.scss']
})
export class PhSliderComponent implements OnInit {
    public active = 0;

    @Input() public label = '';
    @Input() public value = '';
    @Input() public ticks: string[] = [];
    @Input() public tickValues: any[] = [];

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('track') track!: ElementRef<HTMLDivElement>;
    @ViewChild('handle') handle!: ElementRef<HTMLDivElement>;


    private dragged = false;

    constructor() { 
        window.addEventListener('mouseup', (e) => {  
            this.onDragEnd();
        });
    }

    ngOnInit(): void {
    }

    onDragStart(idx: number) {
        this.dragged = true;
        this.setTick(idx);
    }

    onDrag(e: MouseEvent) {
        if (this.dragged) {
            const width = this.track.nativeElement.clientWidth;
            const rect = this.track.nativeElement.getBoundingClientRect();
            const p =  ((e.x - rect.left) / width) * 100;

            this.active = Math.round(((e.x - rect.left) / width) * (this.ticks.length - 1));
            this.track.nativeElement.style.background = `linear-gradient(90deg, #f8a403 0%, #f8a403 ${p}%, rgba(0, 0, 0, 0) ${p}%, rgba(0, 0, 0, 0) 100%)`;
            this.handle.nativeElement.style.left = `${Math.max(Math.min((e.x - rect.left) - 10, width - 8), -10) }px`; 
        }
    }

    onDragEnd() {
        this.dragged = false;
        this.setTick(this.active);
    }

    setTick(idx: number) {
        const width = this.track.nativeElement.clientWidth + 2;
        const p = (idx / (this.ticks.length - 1)) * 100;
        this.track.nativeElement.style.background = `linear-gradient(90deg, #f8a403 0%, #f8a403 ${p}%, rgba(0, 0, 0, 0) ${p}%, rgba(0, 0, 0, 0) 100%)`;
        this.handle.nativeElement.style.left = `${(idx / (this.ticks.length - 1)) * width  - 10}px`; 
        this.active = idx;
    }
}
