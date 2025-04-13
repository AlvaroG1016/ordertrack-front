import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

interface SidebarItem {
  icon: string;
  route: string;
}
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  constructor(private router: Router) { }
  
  items: SidebarItem[] = [
    { icon: 'pi pi-home', route: '/home' },
    { icon: 'pi pi-comment', route: '/comments' },
    { icon: 'pi pi-envelope', route: '/emails' },
    { icon: 'pi pi-th-large', route: '/dashboard' },
    { icon: 'pi pi-user', route: '/user' },
    { icon: 'pi pi-video', route: '/video' }
  ];

  activeItem: SidebarItem = this.items[0];

  selectItem(item: SidebarItem): void {
    this.activeItem = item;
    // Aquí podrías navegar si quieres:
     this.router.navigateByUrl(item.route);
  }
}
