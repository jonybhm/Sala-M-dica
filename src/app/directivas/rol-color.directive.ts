import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRolColor]'
})
export class RolColorDirective implements OnChanges {
  @Input('appRolColor') rol: string | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.rol) {
      let color: string;

      switch (this.rol.toLowerCase()) {
        case 'paciente':
          color = '#810081';
          break;
        case 'especialista':
          color = '#004F4F';
          break;
        case 'admin':
          color = '#DC2B00';
          break;
        default:
          color = 'black';
      }

      this.renderer.setStyle(this.el.nativeElement, 'color', color);
    }
  }
}
