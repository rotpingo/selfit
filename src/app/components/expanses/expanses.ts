import { Component, signal } from '@angular/core';
import { ExpanseModel } from '../../model/expanse.model';
import { FabMenu } from '../shared/fab-menu/fab-menu';

@Component({
  selector: 'app-expanses',
  imports: [FabMenu],
  templateUrl: './expanses.html',
  styleUrl: './expanses.css'
})
export class Expanses {

  expanses = signal<ExpanseModel>({
    title: '',
    category: '',
    date: new Date(Date.now())
  });

}
