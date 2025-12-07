import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CobrancasComponent } from './pages/cobrancas/cobrancas.component';
import { OcorrenciasComponent } from './pages/ocorrencias/ocorrencias.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { PainelComponent } from './pages/painel/painel.component';
import { EncomendasComponent } from './pages/encomendas/encomendas.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CadastroCobrancasComponent } from './pages/cadastro-cobrancas/cadastro-cobrancas.component';
import { NoAuthGuard } from './services/auth/no-auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [NoAuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'painel', component: PainelComponent, canActivate: [AuthGuard] },
  { path: 'encomendas', component: EncomendasComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'cobrancas', component: CobrancasComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-cobrancas', component: CadastroCobrancasComponent, canActivate: [AuthGuard] },
  { path: 'ocorrencias', component: OcorrenciasComponent, canActivate: [AuthGuard] },
  { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
