import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  user: any = { permissions: [] }; // inicializamos con un objeto vacío seguro

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // si el authService aún no tiene user, lo dejamos como objeto con permissions vacío
    this.user = this.authService.user || { permissions: [] };
  }

  showMenu(permisos: string[] = []): boolean {
    if (this.isRole()) {
      return true; // Si es Super Admin, mostramos todo
    }
    // verificamos que existan permisos antes de usar includes
    if (!this.user || !this.user.permissions) {
      return false;
    }
    return permisos.some(permiso => this.user.permissions.includes(permiso));
  }

  isRole(): boolean {
    return this.user.role_name == 'Super Admin';
  }
}
