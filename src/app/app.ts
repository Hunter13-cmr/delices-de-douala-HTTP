import { Component } from '@angular/core';
import { CarteComponent } from './components/carte/carte.component';

/**
 * App - Composant racine de l'application "Délices de Douala"
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarteComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}