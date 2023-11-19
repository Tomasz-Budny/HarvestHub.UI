import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[mapControl]',
  standalone: true
})
export class MapControlDirective implements OnInit {

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    const width = this.el.nativeElement.offsetWidth + 10;
    const height = this.el.nativeElement.offsetHeight + 30;
    this.el.nativeElement.style.position = 'absolute';
    const y = `100vh`;
    const x = '100vw';

    this.el.nativeElement.style.top = `calc(${y}  - ${height}px)`;
    this.el.nativeElement.style.left = `calc(${x}  - ${width}px)`;
  }
}
