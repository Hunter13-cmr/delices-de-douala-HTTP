import {
  Component,
  computed,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

import { MenuService } from '../../services/menu.service';
import { environment } from '../../../environments/environment';
import { Plat } from '../../models/plat';

/**
 * CarteComponent - Affiche le menu de "Délices de Douala"
 * Fonctionnalités :
 * - Chargement depuis /api/plats.json avec httpResource
 * - Gestion 3 états : chargement, erreur, données
 * - Filtre par catégorie avec signal + computed
 * - Plat du jour qui tourne automatiquement (interval RxJS)
 * - Recherche par nom (bonus)
 * - Design premium avec animations
 */
@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './carte.component.html',
  styleUrl: './carte.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarteComponent {
  private readonly menuService = inject(MenuService);

  // Ressource HTTP pour le menu
  readonly menu = this.menuService.menu;

  // Signal pour la catégorie sélectionnée
  readonly selectedCategory = signal<string>('Toutes');

  // Signal pour la recherche
  readonly searchQuery = signal<string>('');

  // Catégories disponibles
  readonly categories = signal<string[]>([
    'Toutes',
    'Plats',
    'Grillades',
    'Végétarien',
    'Boissons',
  ]);

  /**
   * Plat du jour : extrait du menu, change toutes les 5 secondes
   * Utilise interval RxJS converti en Signal avec toSignal()
   */
  readonly platDuJourIndex = toSignal(
    interval(5000).pipe(
      map((tick) => {
        // Récupère la longueur du menu actuel
        const plats = this.menu.value();
        return plats && plats.length > 0 ? tick % plats.length : 0;
      })
    ),
    { initialValue: 0 }
  );

  readonly platDuJour = computed(() => {
    const plats = this.menu.value();
    const index = this.platDuJourIndex();
    return plats && plats.length > 0 ? plats[index] : null;
  });

  /**
   * Liste filtrée des plats
   * Computed : dépend du menu, de la catégorie et de la recherche
   */
  readonly platsFiltres = computed(() => {
    const plats = this.menu.value() || [];
    const category = this.selectedCategory();
    const search = this.searchQuery().toLowerCase();

    return plats.filter((plat) => {
      const matchCategory =
        category === 'Toutes' || plat.categorie === category;
      const matchSearch =
        search === '' || plat.nom.toLowerCase().includes(search);
      return matchCategory && matchSearch;
    });
  });

  /**
   * Plats disponibles uniquement (bonus)
   */
  readonly platsDisponibles = computed(() => {
    return this.platsFiltres().filter((p) => p.disponible);
  });

  /**
   * Compteur des plats affichés
   */
  readonly platCount = computed(() => this.platsFiltres().length);

  /**
   * Compteur des plats indisponibles
   */
  readonly platIndisponiblesCount = computed(() => {
    return this.platsFiltres().filter((p) => !p.disponible).length;
  });

  // Nom du restaurant depuis l'environnement
  readonly restaurantName = environment.restaurantName;

  /**
   * Change la catégorie sélectionnée
   */
  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  /**
   * Réinitialise les filtres et la recherche
   */
  resetFilters() {
    this.selectedCategory.set('Toutes');
    this.searchQuery.set('');
  }

  /**
   * Retourne les classes CSS pour un plat indisponible
   */
  getPlatClasses(plat: Plat): Record<string, boolean> {
    return {
      'plat-card': true,
      'plat-indisponible': !plat.disponible,
      'plat-disponible': plat.disponible,
    };
  }
}
