import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './components/top-bar/top-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'selfit';
}
