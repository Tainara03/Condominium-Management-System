import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(public auth: AuthService) {}
}
