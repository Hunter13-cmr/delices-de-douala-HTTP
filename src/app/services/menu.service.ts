import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Plat } from '../models/plat';

/**
 * MenuService - Centralise l'état du menu et les opérations HTTP
 * État réactif avec signals, lectures via httpResource
 */
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.serverUrl}/api/plats.json`;

  /**
   * Signal pour la recherche (bonus feature)
   */
  readonly searchQuery = signal<string>('');

  /**
   * Charge le menu depuis /api/plats.json avec httpResource
   * Expose : .value() (données), .isLoading(), .error(), .status(), .reload()
   */
  readonly menu = httpResource<Plat[]>(() => this.baseUrl);

  /**
   * Ajoute un plat au service (non utilisé ici, mais disponible pour les écritures)
   */
  ajouter(plat: Plat) {
    return this.http.post<Plat>(this.baseUrl, plat);
  }

  /**
   * Met à jour un plat (via HttpClient, pas httpResource)
   */
  modifier(id: string, modifs: Partial<Plat>) {
    return this.http.put<Plat>(`${this.baseUrl}/${id}`, modifs);
  }

  /**
   * Supprime un plat
   */
  supprimer(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
