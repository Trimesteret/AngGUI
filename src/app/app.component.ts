import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngGUI';
  user: string[] = ['Hello', 'Hi', 'You are welcome', 'boyzzz', 'satengudedme nogle gode junger'];
}
