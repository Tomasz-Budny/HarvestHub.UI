import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[toolbox]',
  standalone: true
})
export class ToolBoxDirective implements OnInit {

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    const parentNode = this.el.nativeElement.parentNode

    let x = parentNode.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2;

    let y = parentNode.getBoundingClientRect().top + this.el.nativeElement.offsetHeight;

    this.createTooltipPopup(x, y); 
  }

  private createTooltipPopup(x: number, y: number) {
    this.el.nativeElement.style.top = y.toString() + "px";
    this.el.nativeElement.style.left = x.toString() + "px";
  }
}
