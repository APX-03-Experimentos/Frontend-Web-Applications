import { Component, signal } from '@angular/core';
import {Navigator} from './public/components/navigator/navigator';

@Component({
  selector: 'app-root',
  imports: [Navigator],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('LhFrontEnd');
}
