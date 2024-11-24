import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  standalone: true
})
export class FiltroPipe implements PipeTransform {

  transform(value: any[], propiedad: string): any[] {
    if (!value || !propiedad) {
      return value;
    }
    return value.filter((item, index, self) => index === self.findIndex((t) => t[propiedad] === item[propiedad]));
  }
}

