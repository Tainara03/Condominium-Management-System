import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}
}
