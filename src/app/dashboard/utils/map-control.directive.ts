import { AfterViewInit, Directive, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[mapControl]',
  standalone: true
})
export class MapControlDirective implements AfterViewInit {

  constructor(
    private el: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.editPosition();
  }

  editPosition() {
    const width = this.el.nativeElement.offsetWidth + 80;
    const height = this.el.nativeElement.offsetHeight + 30;
    this.el.nativeElement.style.position = 'absolute';
    const y = `100vh`;
    const x = '100vw';

    this.el.nativeElement.style.top = `calc(${y}  - ${height}px)`;
    this.el.nativeElement.style.left = `calc(${x}  - ${width}px)`;
  }

}
