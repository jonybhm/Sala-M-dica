import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  
  constructor() { }
  
  http = inject(HttpClient);

  obtnerInfo()
  {
    return this.http.request('GET',`https://api.github.com/users/jonybhm`);
  }
   
}
