import { Routes } from '@angular/router';
import { Notes } from './components/notes/notes';
import { Home } from './components/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'notes',
    component: Notes,
  }
];
