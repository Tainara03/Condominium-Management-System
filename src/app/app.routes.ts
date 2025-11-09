import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CobrancasComponent } from './pages/cobrancas/cobrancas.component';
import { OcorrenciasComponent } from './pages/ocorrencias/ocorrencias.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/auth.guard-guard';
import { EncomendasComponent } from './pages/encomendas/encomendas.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'cobrancas', component: CobrancasComponent, canActivate: [AuthGuard] },
  { path: 'encomendas', component: EncomendasComponent, canActivate: [AuthGuard] },
  { path: 'ocorrencias', component: OcorrenciasComponent, canActivate: [AuthGuard] },
  { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
