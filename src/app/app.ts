import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navigator} from './public/components/navigator/navigator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigator],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('LhFrontEnd');
}
