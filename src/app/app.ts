import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './components/top-bar/top-bar';
import { SideBar } from './components/side-bar/side-bar';
import { Backdrop } from './components/shared/backdrop/backdrop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar, SideBar, Backdrop],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected title = 'selfit';

  sideBarOpen = signal<boolean>(false);


  onSideBarOpen() {
    this.sideBarOpen.set(true);
  }

  onSideBarClose() {
    this.sideBarOpen.set(false);
  }
}
