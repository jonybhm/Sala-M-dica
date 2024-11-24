import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'habilitado',
  standalone: true
})
export class HabilitadoPipe implements PipeTransform {

  transform(value: string): string | null {
    if(value)
    {     
      return `Está habilitado`;      
    }
    return `No está habilitado`;
  }

}
