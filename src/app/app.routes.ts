import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CobrancasComponent } from './pages/cobrancas/cobrancas.component';
import { OcorrenciasComponent } from './pages/ocorrencias/ocorrencias.component';
import { ReservasComponent } from './pages/reservas/reservas.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'cobranças', component: CobrancasComponent },
  { path: 'ocorrências', component: OcorrenciasComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];
