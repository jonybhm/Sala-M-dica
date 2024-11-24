import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appZoomFotos]',
})
export class ZoomFotosDirective {

  private originalTransform: string | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'zoom-in');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease-in-out');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.originalTransform = this.el.nativeElement.style.transform;
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(2)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', this.originalTransform || 'scale(1)');
  }
}
