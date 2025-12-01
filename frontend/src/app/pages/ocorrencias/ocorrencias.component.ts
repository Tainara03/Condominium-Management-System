import { Component } from '@angular/core';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-ocorrencias',
  imports: [],
  templateUrl: './ocorrencias.component.html',
  styleUrl: './ocorrencias.component.css'
})
export class OcorrenciasComponent {

  private apiUrl = `${environment.apiUrl}ocorrencias`;  

}
