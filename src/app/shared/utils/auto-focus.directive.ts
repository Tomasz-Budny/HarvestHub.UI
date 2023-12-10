import {AfterViewInit, Directive,ElementRef, OnInit} from '@angular/core'
  
@Directive({ 
  selector:'[autofocusOnElement]',
  standalone: true
}) 
export class AutoFocusDirective implements AfterViewInit { 
  
  constructor( 
    private elementRef: ElementRef 
  ){} 

  ngAfterViewInit(){ 
    this.elementRef.nativeElement.focus(); 
  } 
}