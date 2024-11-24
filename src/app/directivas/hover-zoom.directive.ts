import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverZoom]'
})
export class HoverZoomDirective {

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2
  ) { }
  
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.1)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.2s, box-shadow 0.2s');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'none');
  }
}
