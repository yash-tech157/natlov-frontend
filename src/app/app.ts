import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 1. Import the NavbarComponent
import { NavbarComponent } from './components/navbar/navbar.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Add NavbarComponent to the imports array
  imports: [RouterOutlet, NavbarComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('QuizApp');
}