import { Component, input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {
  isOpen = input<boolean>(false);
}
