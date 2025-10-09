import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TournamentForm {
  name: string;
  type: string;
  gameType: string;
  startDate: string;
  seeded: boolean;
  participants: string[];
}

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tournament-form.html',
  styleUrls: ['./tournament-form.css']
})
export class TournamentFormComponent {
  formData: TournamentForm = {
    name: '',
    type: 'SINGLE_ELIM',
    gameType: 'SINGLES',
    startDate: '',
    seeded: false,
    participants: []
  };

  playerName: string = '';

  pickleShades = [
    { light: 'bg-lime-400', mid: 'bg-green-500', dark: 'bg-green-700', stroke: '#15803d' },
    { light: 'bg-green-400', mid: 'bg-green-600', dark: 'bg-green-800', stroke: '#166534' },
    { light: 'bg-lime-500', mid: 'bg-green-600', dark: 'bg-green-700', stroke: '#15803d' },
    { light: 'bg-emerald-400', mid: 'bg-emerald-600', dark: 'bg-green-700', stroke: '#15803d' },
    { light: 'bg-green-500', mid: 'bg-green-700', dark: 'bg-green-900', stroke: '#14532d' }
  ];

  addPlayer(): void {
    if (this.playerName.trim()) {
      this.formData.participants.push(this.playerName.trim());
      this.playerName = '';
    }
  }

  removePlayer(index: number): void {
    this.formData.participants.splice(index, 1);
  }

  generateTeamNames(): void {
    alert('AI Team Name Generator coming soon! 🤖🥒');
  }

  onSubmit(): void {
    console.log('Tournament Data:', this.formData);
    alert('Tournament created! Check console for data.');
    // TODO: Call your Spring Boot API
    // this.http.post('http://localhost:8080/api/tournaments', this.formData).subscribe(...);
  }

  getPickleShade(index: number) {
    return this.pickleShades[index % this.pickleShades.length];
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addPlayer();
    }
  }
}