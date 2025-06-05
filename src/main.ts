import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { seedDummyNotes } from './app/data/db';

seedDummyNotes();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
