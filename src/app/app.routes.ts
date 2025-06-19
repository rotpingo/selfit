import { Routes } from '@angular/router';
import { Notes } from './components/notes/notes';
import { Home } from './components/home/home';
import { Note } from './components/notes/note/note';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'notes',
    component: Notes,
  },
  {
    path: 'notes/:id',
    component: Note,
  }
];
