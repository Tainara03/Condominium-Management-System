import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

interface Unidade {
  id: string;
  building: string;
  apartment: string;
}

interface ApartamentoOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-encomendas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './encomendas.component.html',
  styleUrls: ['./encomendas.component.css']
})
export class EncomendasComponent {
  private apiUrl = `${environment.apiUrl}encomendas`;  

  dataHoraMaxima = new Date().toISOString().slice(0, 16);
}
