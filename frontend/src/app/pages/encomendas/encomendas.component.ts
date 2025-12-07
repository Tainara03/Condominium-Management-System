import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-encomendas',
  imports: [],
  templateUrl: './encomendas.component.html',
  styleUrl: './encomendas.component.css'
})
export class EncomendasComponent {
  private apiUrl = `${environment.apiUrl}encomendas`;  

  dataHoraMaxima = new Date().toISOString().slice(0, 16);
}
