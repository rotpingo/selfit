import { Component, computed, output, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-fab-menu',
  imports: [],
  templateUrl: './fab-menu.html',
  styleUrl: './fab-menu.css'
})
export class FabMenu {

  action = output<string>();
  isOpen = signal(false);
  currentRoute = signal('');

  constructor(private router: Router) {
    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.urlAfterRedirects);
      });
  }
  options = computed(() => {

    const route = this.currentRoute();

    if (route.includes('/tasks')) {
      return [
        { icon: 'icons/edit.svg', key: 'edit' },
        { icon: 'icons/delete.svg', key: 'delete' },
      ];
    } else if (route.includes('/notes')) {
      return [
        { icon: 'icons/edit.svg', key: 'edit' },
        { icon: 'icons/delete.svg', key: 'delete' },
      ]
    }

    return [];
  });

  onEmitAction(key: string) {
    this.action.emit(key);
  }

  toggle() {
    this.isOpen.set(!this.isOpen());
  }
}
