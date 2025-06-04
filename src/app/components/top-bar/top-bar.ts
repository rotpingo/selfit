import { Component, output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar {
  menuClick = output<void>();

  onMenuClick() {
    this.menuClick.emit();
  }
}
