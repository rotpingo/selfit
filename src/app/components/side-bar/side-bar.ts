import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {
  isOpen = input<boolean>(false);
  navigate = output<void>();

  onNavigate() {
    this.navigate.emit();
  }
}
