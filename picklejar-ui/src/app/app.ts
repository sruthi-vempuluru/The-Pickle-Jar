import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { TournamentFormComponent } from './tournament-form/tournament-form';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TournamentFormComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'PickleJar UI';
}