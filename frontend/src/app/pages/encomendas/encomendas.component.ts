import { Component } from '@angular/core';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-encomendas',
  imports: [],
  templateUrl: './encomendas.component.html',
  styleUrl: './encomendas.component.css'
})
export class EncomendasComponent {

  private apiUrl = `${environment.apiUrl}encomendas`;  

}
