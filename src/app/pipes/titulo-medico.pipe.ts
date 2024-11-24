import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tituloMedico',
  standalone: true
})
export class TituloMedicoPipe implements PipeTransform {

  transform(value: string): string | null {
    if(value)
    {
      return `Dr. ${value}`;
    }
    return null;
  }

}
